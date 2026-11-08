import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { toCodeTokenName } from './token-name-aliases.mjs';
const source = JSON.parse(await readFile(new URL('../figma/tokens.json', import.meta.url), 'utf8'));
const variables = new Map(source.variables.map((v) => [v.id, v]));
const cssName = (name) => `--col-${name.replaceAll('/', '-')}`;
function resolve(v, mode, seen = new Set()) {
  if (seen.has(v.id)) throw new Error(`Circular token alias: ${v.name}`);
  seen.add(v.id);
  const value = v.values[mode] ?? Object.values(v.values)[0];
  if (value?.type === 'VARIABLE_ALIAS') {
    const target = variables.get(value.id);
    if (!target) throw new Error(`Unresolved alias ${value.id}`);
    return resolve(target, mode, seen);
  }
  if (v.type === 'COLOR')
    return (
      '#' +
      ['r', 'g', 'b']
        .map((k) =>
          Math.round(value[k] * 255)
            .toString(16)
            .padStart(2, '0'),
        )
        .join('')
    );
  return value;
}
const tokens = { source: source.url, light: {}, dark: {}, spacing: {}, radius: {}, primitives: {} };
for (const v of source.variables) {
  const name = toCodeTokenName(v.name);
  if (name.startsWith('spacing/')) tokens.spacing[name] = resolve(v);
  else if (name.startsWith('radius/')) tokens.radius[name] = resolve(v);
  else if (v.collection === 'VariableCollectionId:5:10') tokens.primitives[name] = resolve(v);
  else
    for (const [theme, mode] of [
      ['light', '10:10'],
      ['dark', '10:12'],
    ])
      tokens[theme][name] = resolve(v, mode);
}
const declarations = (entries, unit = '') =>
  Object.entries(entries)
    .map(([k, v]) => `  ${cssName(k)}: ${v}${unit};`)
    .join('\n');
const shared = [
  declarations(tokens.primitives),
  declarations(tokens.spacing, 'px'),
  declarations(tokens.radius, 'px'),
  '  --col-font-family: Inter, system-ui, -apple-system, sans-serif;',
].join('\n');
const css = `/* Generated from figma/tokens.json. Run npm run tokens. */\n:root, .col-theme {\n${shared}\n${declarations(tokens.light)}\n  color-scheme: light;\n}\n[data-theme="light"] {\n${declarations(tokens.light)}\n  color-scheme: light;\n}\n[data-theme="dark"] {\n${declarations(tokens.dark)}\n  color-scheme: dark;\n}\n`;
await mkdir(new URL('../src/foundations/tokens', import.meta.url), { recursive: true });
await writeFile(new URL('../src/foundations/tokens/generated.css', import.meta.url), css);
await writeFile(
  new URL('../src/foundations/tokens/tokens.json', import.meta.url),
  JSON.stringify(tokens, null, 2) + '\n',
);
console.log(`Generated ${source.variables.length} source tokens for light and dark themes.`);
