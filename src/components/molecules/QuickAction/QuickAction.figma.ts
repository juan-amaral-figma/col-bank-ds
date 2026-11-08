// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=44-640
// source=src/components/molecules/QuickAction/QuickAction.tsx
// component=QuickAction
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Etiqueta');
const state = instance.getEnum('Estado', { 'Predeterminado': 'default', 'Deshabilitado': 'disabled' });
const actionButtonInstance = instance.findInstance('Botón de acción');
const actionButtonCode =
  actionButtonInstance && actionButtonInstance.type === 'INSTANCE'
    ? actionButtonInstance.executeTemplate().example
    : undefined;

export default {
  example: figma.code`<QuickAction
    label={${JSON.stringify(label)}}
    ${state === 'disabled' ? 'disabled' : ''}
    ${actionButtonCode ? figma.code`actionButton={${actionButtonCode}}` : ''}
  />`,
  imports: ['import { QuickAction, IconButton, Icon } from "@col-bank/react"'],
  id: 'QuickAction',
  metadata: { nestable: true },
};
