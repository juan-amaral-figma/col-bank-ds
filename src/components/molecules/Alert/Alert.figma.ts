// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/COL-BANK?node-id=274-497
// source=src/components/molecules/Alert/Alert.tsx
// component=Alert
import figma from 'figma';

const instance = figma.selectedInstance;
const message = instance.getString('Mensaje');
const iconInstance = instance.findInstance('Ícono');
const iconCode =
  iconInstance && iconInstance.type === 'INSTANCE'
    ? iconInstance.executeTemplate().example
    : undefined;

export default {
  example: figma.code`<Alert
    message={${JSON.stringify(message)}}
    ${iconCode ? figma.code`icon={${iconCode}}` : ''}
  />`,
  imports: ['import { Alert, Icon } from "@col-bank/react"'],
  id: 'Alert',
  metadata: { nestable: true },
};
