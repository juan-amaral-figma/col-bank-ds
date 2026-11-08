// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=19-172
// source=src/components/atoms/RadioButton/RadioButton.tsx
// component=RadioButton
import figma from 'figma';

const instance = figma.selectedInstance;
// Provide a shared native name when composing a radio group.
const label = instance.getString('Etiqueta');
const showLabel = instance.getBoolean('Mostrar etiqueta');
const state = instance.getEnum('Estado', {
  'Sin seleccionar': 'unselected',
  'Seleccionado': 'selected',
  'Deshabilitado': 'disabled',
});

export default {
  example: figma.code`<RadioButton
    label={${JSON.stringify(label)}}
    showLabel={${showLabel}}
    ${state === 'selected' ? 'defaultChecked' : ''}
    ${state === 'disabled' ? 'disabled' : ''}
  />`,
  imports: ['import { RadioButton } from "@col-bank/react"'],
  id: 'RadioButton',
  metadata: { nestable: true },
};
