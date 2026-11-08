import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

interface PropertyContract {
  name: string;
  type: string;
  variantOptions?: string[];
}

interface ComponentContract {
  name: string;
  figmaName: string;
  nodeId: string;
  source: string;
  properties: PropertyContract[];
  dependencies: string[];
}

// Captured Figma contracts protect against invalid property names and missing nested imports.
const contracts = JSON.parse(
  readFileSync('tests/fixtures/figma-components.json', 'utf8'),
) as ComponentContract[];
const byName = new Map(contracts.map((component) => [component.name, component]));
const getterTypes: Record<string, string> = {
  getString: 'TEXT',
  getBoolean: 'BOOLEAN',
  getInstanceSwap: 'INSTANCE_SWAP',
  getEnum: 'VARIANT',
};

function dependencyNames(name: string, seen = new Set<string>()): Set<string> {
  if (seen.has(name)) return seen;
  seen.add(name);
  const component = byName.get(name);
  if (!component) throw new Error(`Unknown Figma component ${name}`);
  for (const child of component.dependencies) dependencyNames(child, seen);
  return seen;
}

describe.each(contracts)('$name Code Connect template', ({ name, source, figmaName, nodeId }) => {
  const fileName = source.replace(/\.tsx$/, '.figma.ts');
  const template = ts.createSourceFile(
    fileName,
    readFileSync(fileName, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  );

  it('targets the real Spanish Figma component while importing the English React API', () => {
    const content = template.getFullText();
    const actualNodeId = nodeId.replace(':', '-');
    expect(content, `${name} should target ${figmaName} (${nodeId})`).toContain(
      `node-id=${actualNodeId}`,
    );
    expect(content, `${name} must import the actual design system package`).toContain(
      'from "@col-bank/react"',
    );
    expect(content, `${name} should keep the English code export`).toContain(`id: '${name}'`);
  });

  it('uses public Template API property names, rather than Plugin API property IDs', () => {
    const contract = byName.get(name)!;
    const publicProperties = new Map(
      contract.properties.map((property) => [property.name, property]),
    );
    const visited = new Set<string>();

    const visit = (node: ts.Node) => {
      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        node.expression.expression.getText(template) === 'instance'
      ) {
        const getter = node.expression.name.text;
        if (getter in getterTypes) {
          const argument = node.arguments[0];
          expect(
            argument && ts.isStringLiteral(argument),
            `${getter} needs a literal public property name`,
          ).toBe(true);
          if (!argument || !ts.isStringLiteral(argument)) return;
          const property = publicProperties.get(argument.text);
          expect(
            property,
            `${name}: Template API cannot read internal property ID ${argument.text}`,
          ).toBeDefined();
          expect(property?.type).toBe(getterTypes[getter]);
          visited.add(argument.text);

          if (getter === 'getEnum') {
            const options = node.arguments[1];
            expect(options && ts.isObjectLiteralExpression(options)).toBe(true);
            if (options && ts.isObjectLiteralExpression(options)) {
              const mapped = options.properties.map((entry) =>
                entry.name && (ts.isIdentifier(entry.name) || ts.isStringLiteral(entry.name))
                  ? entry.name.text
                  : undefined,
              );
              for (const value of property?.variantOptions ?? []) expect(mapped).toContain(value);
            }
          }
        }
      }
      ts.forEachChild(node, visit);
    };

    visit(template);
    expect([...visited].sort()).toEqual([...publicProperties.keys()].sort());
  });

  it('includes imports for nested and deeply nested component snippets', () => {
    const declaration = template.statements.find(ts.isExportAssignment);
    expect(declaration && ts.isObjectLiteralExpression(declaration.expression)).toBe(true);
    if (!declaration || !ts.isObjectLiteralExpression(declaration.expression)) return;
    const imports = declaration.expression.properties.find(
      (entry) => ts.isPropertyAssignment(entry) && entry.name.getText(template) === 'imports',
    );
    expect(
      imports &&
        ts.isPropertyAssignment(imports) &&
        ts.isArrayLiteralExpression(imports.initializer),
    ).toBe(true);
    if (
      !imports ||
      !ts.isPropertyAssignment(imports) ||
      !ts.isArrayLiteralExpression(imports.initializer)
    )
      return;

    const declared = new Set<string>();
    for (const entry of imports.initializer.elements) {
      if (!ts.isStringLiteral(entry)) continue;
      const importFile = ts.createSourceFile(
        'snippet-import.ts',
        entry.text,
        ts.ScriptTarget.Latest,
        true,
      );
      for (const statement of importFile.statements) {
        if (
          ts.isImportDeclaration(statement) &&
          statement.importClause?.namedBindings &&
          ts.isNamedImports(statement.importClause.namedBindings)
        ) {
          for (const symbol of statement.importClause.namedBindings.elements)
            declared.add(symbol.name.text);
        }
      }
    }
    for (const component of dependencyNames(name))
      expect(declared, `${name}: missing nested import ${component}`).toContain(component);
  });
});
