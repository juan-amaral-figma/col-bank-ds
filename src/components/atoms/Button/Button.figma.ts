// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=19-97
// source=src/components/atoms/Button/Button.tsx
// component=Button
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Etiqueta');
const hierarchy = instance.getEnum('Jerarquía', {
  'Primario': 'primary',
  'Secundario': 'secondary',
  'Terciario': 'tertiary',
});
const size = instance.getEnum('Tamaño', { 'Pequeño': 'sm', 'Mediano': 'md', 'Grande': 'lg' });
const state = instance.getEnum('Estado', {
  'Predeterminado': 'default',
  'Deshabilitado': 'disabled',
  'Cargando': 'loading',
});

export default {
  example: figma.code`<Button
    hierarchy={${JSON.stringify(hierarchy)}}
    size={${JSON.stringify(size)}}
    ${state === 'disabled' ? 'disabled' : ''}
    ${state === 'loading' ? 'loading' : ''}
  >
    {${JSON.stringify(label)}}
  </Button>`,
  imports: ['import { Button } from "@col-bank/react"'],
  id: 'Button',
  metadata: { nestable: true },
};
