// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=19-158
// source=src/components/atoms/Checkbox/Checkbox.tsx
// component=Checkbox
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Etiqueta');
const showLabel = instance.getBoolean('Mostrar etiqueta');
const state = instance.getEnum('Estado', {
  'Sin marcar': 'unchecked',
  'Marcado': 'checked',
  'Deshabilitado': 'disabled',
});
const indicatorInstance = instance.findInstance('Ícono');
const indicatorCode =
  indicatorInstance && indicatorInstance.type === 'INSTANCE'
    ? indicatorInstance.executeTemplate().example
    : undefined;

export default {
  example: figma.code`<Checkbox
    label={${JSON.stringify(label)}}
    showLabel={${showLabel}}
    ${state === 'checked' ? 'defaultChecked' : ''}
    ${state === 'disabled' ? 'disabled' : ''}
    ${indicatorCode ? figma.code`indicator={${indicatorCode}}` : ''}
  />`,
  imports: ['import { Checkbox, Icon } from "@col-bank/react"'],
  id: 'Checkbox',
  metadata: { nestable: true },
};
