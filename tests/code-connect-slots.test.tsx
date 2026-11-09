import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { describe, expect, it, vi } from 'vitest';
import type { ResultSection } from 'figma';
import { iconAssets } from '../src/components/atoms/Icon/icons';

const templates = {
  AccountCard: 'molecules/AccountCard',
  Alert: 'molecules/Alert',
  Button: 'atoms/Button',
  Icon: 'atoms/Icon',
  IconButton: 'atoms/IconButton',
  Divider: 'atoms/Divider',
} as const;
type ComponentName = keyof typeof templates;
interface TemplateResult {
  example: ResultSection[];
  imports: string[];
  metadata: { nestable: boolean; props?: Record<string, unknown> };
}
type LocalSlot = ResultSection[] & { readonly connectedInstances: LocalInstance[] };

// Local Template API double: keep section objects intact instead of coercing snippets to strings.
// These tests execute the real template source, not Figma's hosted runtime or its slot resolver.
function code(strings: TemplateStringsArray, ...values: unknown[]): ResultSection[] {
  const sections: ResultSection[] = [];
  strings.forEach((literal, index) => {
    sections.push({ type: 'CODE', code: literal });
    const value = values[index];
    if (Array.isArray(value)) sections.push(...value);
    else if (value !== undefined && value !== null) {
      if (typeof value === 'object') throw new Error('Unexpected unstructured interpolation');
      sections.push({ type: 'CODE', code: String(value) });
    }
  });
  return sections;
}

const compiled = new Map(
  Object.entries(templates).map(([name, path]) => [
    name,
    ts.transpileModule(readFileSync(`src/components/${path}/${name}.figma.ts`, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText,
  ]),
);

class LocalInstance {
  readonly type = 'INSTANCE';
  constructor(
    readonly component: ComponentName,
    readonly properties: Record<string, string | boolean> = {},
    readonly children: Record<string, LocalInstance> = {},
    readonly content?: LocalInstance[],
  ) {}
  getString(name: string) {
    if (typeof this.properties[name] !== 'string') throw new Error(`Missing text ${name}`);
    return this.properties[name];
  }
  getEnum(name: string, mapping: Record<string, unknown>) {
    return mapping[String(this.properties[name])];
  }
  findInstance(name: string) {
    return this.children[name] ?? { type: 'ERROR' };
  }
  findText() {
    return { type: 'TEXT', textContent: 'Saldo disponible' };
  }
  getSlot = vi.fn((name: string): LocalSlot | undefined => {
    if (name !== 'Contenido') throw new Error(`Unknown slot ${name}`);
    if (this.content === undefined) return undefined;
    // Direct interpolation represents a clickable slot label, not expanded child templates.
    const label: ResultSection = { type: 'SLOT', propertyName: name, guid: 'slot-guid' };
    return Object.assign([label], { connectedInstances: this.content });
  });
  executeTemplate(): TemplateResult {
    const exports: { default?: TemplateResult } = {};
    runInNewContext(compiled.get(this.component)!, {
      exports,
      require: (name: string) => {
        if (name !== 'figma') throw new Error(`Unexpected import ${name}`);
        return { __esModule: true, default: { selectedInstance: this, code } };
      },
    });
    return exports.default!;
  }
}

function icon(name: string) {
  return new LocalInstance('Icon', { Nombre: name });
}
function button(label: string) {
  return new LocalInstance('Button', {
    Etiqueta: label,
    Jerarquía: 'Primario',
    Tamaño: 'Mediano',
    Estado: 'Predeterminado',
  });
}
function card(content?: LocalInstance[], hidden = false) {
  return new LocalInstance(
    'AccountCard',
    {
      'Tipo de cuenta': 'Cuenta de Ahorros',
      'Número de cuenta': '•••• 4582',
      Saldo: '$2.450.000 COP',
      Estado: hidden ? 'Saldo oculto' : 'Predeterminado',
    },
    {
      Ícono: icon('Billetera'),
      'Botón de visibilidad del saldo': new LocalInstance(
        'IconButton',
        {
          Estado: 'Predeterminado',
          Tamaño: 'Pequeño',
        },
        { Ícono: icon(hidden ? 'Ojo cerrado' : 'Ojo') },
      ),
      Separador: new LocalInstance('Divider', { Orientación: 'Horizontal' }),
    },
    content,
  );
}
function text(result: TemplateResult) {
  return result.example
    .map((section) => {
      if (section.type !== 'CODE') throw new Error('Expected locally evaluated code');
      return section.code;
    })
    .join('');
}

describe('React slot mappings (local Template API double)', () => {
  it.each([
    { label: 'undefined', content: undefined },
    { label: '[]', content: [] },
  ])('handles an empty slot ($label)', ({ content }) => {
    const instance = card(content);
    const snippet = text(instance.executeTemplate());
    expect(instance.getSlot).toHaveBeenCalledWith('Contenido');
    expect(snippet).toContain('</AccountCard>');
    expect(snippet).not.toMatch(/<Alert|<Button\s|undefined|\[object Object\]/);
  });

  it('getSlot exposes connectedInstances without executing their templates', () => {
    const child = button('Transferir');
    const execute = vi.spyOn(child, 'executeTemplate');
    const slot = card([child]).getSlot('Contenido')!;
    expect(slot[0].type).toBe('SLOT');
    expect(slot.connectedInstances).toEqual([child]);
    expect(execute).not.toHaveBeenCalled();
  });

  it('preserves child result sections and omits the clickable slot label', () => {
    const child = button('Transferir');
    const section: ResultSection = { type: 'INSTANCE', guid: 'child-guid', symbolId: 'button' };
    const execute = vi.spyOn(child, 'executeTemplate').mockReturnValue({
      example: [section],
      imports: [],
      metadata: { nestable: true },
    });
    const instance = card([child]);
    const result = instance.executeTemplate();
    expect(execute).toHaveBeenCalledOnce();
    expect(result.example).toContain(section);
    expect(result.example.some((part) => part.type === 'SLOT')).toBe(false);
  });

  it('renders the slot Alert with its real message and configurable nested icon', () => {
    const message = 'Saldo "bajo"\nRevisa tu cuenta';
    for (const [figmaName, codeName] of [
      ['Información', 'info'],
      ['Pago', 'payment'],
    ]) {
      const alert = new LocalInstance('Alert', { Mensaje: message }, { Ícono: icon(figmaName) });
      const result = card([alert]).executeTemplate();
      const snippet = text(result);
      expect(snippet).toContain(`message={${JSON.stringify(message)}}`);
      expect(snippet).toContain(`name={"${codeName}"}`);
      expect(snippet.indexOf('<Alert')).toBeGreaterThan(snippet.indexOf('divider='));
      expect(snippet.indexOf('<Alert')).toBeLessThan(snippet.indexOf('</AccountCard>'));
      expect(alert.executeTemplate().metadata.nestable).toBe(true);
      expect(result.imports[0]).toContain('Alert');
    }
  });

  it('keeps Transferir and Pagar in slot order, including when the order changes', () => {
    for (const labels of [
      ['Transferir', 'Pagar'],
      ['Pagar', 'Transferir'],
    ]) {
      const result = card(labels.map(button)).executeTemplate();
      const snippet = text(result);
      expect(snippet.match(/<Button\s/g)).toHaveLength(2);
      expect(snippet.indexOf(JSON.stringify(labels[0]))).toBeLessThan(
        snippet.indexOf(JSON.stringify(labels[1])),
      );
      expect(result.imports[0]).toContain('Button');
    }
  });

  it('preserves account, state, icon, visibility button and divider mappings', () => {
    const snippet = text(card([], true).executeTemplate());
    for (const value of ['Cuenta de Ahorros', '•••• 4582', '$2.450.000 COP', 'Saldo disponible']) {
      expect(snippet).toContain(JSON.stringify(value));
    }
    expect(snippet).toContain('defaultBalanceHidden={true}');
    expect(snippet).toContain('name={"wallet"}');
    expect(snippet).toContain('name={"eye-off"}');
    expect(snippet).toContain('visibilityButton=');
    expect(snippet).toContain('orientation={"horizontal"}');
  });

  it.each([
    ['Inicio', 'home'],
    ['Transferencia', 'transfer'],
    ['Billetera', 'wallet'],
    ['Tarjeta de crédito', 'credit-card'],
    ['Buscar', 'search'],
    ['Notificación', 'notification'],
    ['Flecha', 'arrow'],
    ['Marca de verificación', 'check'],
    ['Cerrar', 'close'],
    ['Ojo', 'eye'],
    ['Ojo cerrado', 'eye-off'],
    ['Pago', 'payment'],
    ['Información', 'info'],
  ] as const)('maps %s to the supported React icon %s', (figmaName, codeName) => {
    const result = icon(figmaName).executeTemplate();
    expect(result.metadata.props?.name).toBe(codeName);
    expect(iconAssets[codeName]).toBeTruthy();
  });
});
