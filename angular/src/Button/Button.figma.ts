// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/COL-BANK?node-id=19-97
// source=src/Button/button.ts
// component=Button
import figma from 'figma';

const instance = figma.selectedInstance;
const label = instance.getString('Etiqueta');
const hierarchy = instance.getEnum('Jerarquía', {
  Primario: 'primary',
  Secundario: 'secondary',
  Terciario: 'tertiary',
});
const size = instance.getEnum('Tamaño', { Pequeño: 'sm', Mediano: 'md', Grande: 'lg' });
const state = instance.getEnum('Estado', {
  Predeterminado: 'default',
  Deshabilitado: 'disabled',
  Cargando: 'loading',
});
// Botón currently has no icon property/layer. Only emit the optional Angular input
// when a directly connected Icon is actually present; do not invent a fallback.
const iconInstance = instance.findConnectedInstance('Icon');
const iconResult =
  iconInstance && iconInstance.type === 'INSTANCE' ? iconInstance.executeTemplate() : undefined;
const iconName = iconResult?.metadata?.props?.name;
if (iconResult && typeof iconName !== 'string') {
  throw new Error('Button: the connected Icon template must expose metadata.props.name.');
}

function html(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default {
  example: figma.code`<button colButton hierarchy="${hierarchy}" size="${size}" [disabled]="${state === 'disabled'}" [loading]="${state === 'loading'}"${typeof iconName === 'string' ? figma.code` icon="${html(iconName)}"` : ''}>${html(label)}</button>`,
  id: 'Button',
  metadata: { nestable: true },
};
