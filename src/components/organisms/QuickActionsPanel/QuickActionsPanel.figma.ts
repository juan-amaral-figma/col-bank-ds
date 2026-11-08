// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=68-425
// source=src/components/organisms/QuickActionsPanel/QuickActionsPanel.tsx
// component=QuickActionsPanel
import figma from 'figma';

const instance = figma.selectedInstance;
// State is also reflected by each nested QuickAction and IconButton.
const heading = instance.getString('Encabezado');
const state = instance.getEnum('Estado', { 'Predeterminado': 'default', 'Deshabilitado': 'disabled' });
const transferInstance = instance.findInstance('Transferir');
const transferCode =
  transferInstance && transferInstance.type === 'INSTANCE'
    ? transferInstance.executeTemplate().example
    : undefined;
const payInstance = instance.findInstance('Pagar');
const payCode =
  payInstance && payInstance.type === 'INSTANCE'
    ? payInstance.executeTemplate().example
    : undefined;
const historyInstance = instance.findInstance('Movimientos');
const historyCode =
  historyInstance && historyInstance.type === 'INSTANCE'
    ? historyInstance.executeTemplate().example
    : undefined;

export default {
  example: figma.code`<QuickActionsPanel
    heading={${JSON.stringify(heading)}}
    ${state === 'disabled' ? 'disabled' : ''}
  >
    ${transferCode}
    ${payCode}
    ${historyCode}
  </QuickActionsPanel>`,
  imports: ['import { QuickActionsPanel, QuickAction, IconButton, Icon } from "@col-bank/react"'],
  id: 'QuickActionsPanel',
  metadata: { nestable: true },
};
