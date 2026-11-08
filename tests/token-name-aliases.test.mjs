import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { toCodeTokenName } from '../scripts/token-name-aliases.mjs';

const originalCss = readFileSync('src/foundations/tokens/generated.css', 'utf8');
const snapshot = JSON.parse(readFileSync('figma/tokens.json', 'utf8'));

describe('Spanish Figma token names / English code API', () => {
  it.each([
    ['amarillo/500', 'yellow/500'],
    ['verde/500', 'green/500'],
    ['rojo/500', 'red/500'],
    ['texto/primario', 'text/primary'],
    ['texto/sobre-marca', 'text/on-brand'],
    ['superficie/secundario', 'surface/secondary'],
    ['estado/éxito', 'status/success'],
    ['espaciado/8', 'spacing/8'],
    ['radio/extra-extra-grande', 'radius/2xl'],
    ['neutral/900', 'neutral/900'],
  ])('maps %s to %s', (figmaName, expected) => {
    expect(toCodeTokenName(figmaName)).toBe(expected);
  });

  it('keeps every CSS custom property under its stable English name', () => {
    expect(snapshot.variables).toHaveLength(34);
    for (const variable of snapshot.variables) {
      const expected = `--col-${toCodeTokenName(variable.name).replaceAll('/', '-')}:`;
      expect(originalCss, `Missing CSS token for ${variable.name}`).toContain(expected);
    }
    expect(originalCss).not.toContain('--col-amarillo-500:');
    expect(originalCss).not.toContain('--col-espaciado-8:');
  });
});
