// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/COL-BANK?node-id=274-497
// source=src/Alert/alert.ts
// component=Alert
import figma from 'figma';

const instance = figma.selectedInstance;
const message = instance.getString('Mensaje');
const iconInstance = instance.findInstance('Ícono');
if (!iconInstance || iconInstance.type !== 'INSTANCE') {
  throw new Error('Alert: the icon lookup did not return a valid instance.');
}
const iconResult = iconInstance.executeTemplate();
const name = iconResult.metadata?.props?.name;
if (typeof name !== 'string') {
  throw new Error('Alert: the connected Icon template must expose metadata.props.name.');
}

function html(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default {
  example: figma.code`<col-alert message="${html(message)}" icon="${html(name)}"></col-alert>`,
  id: 'Alert',
  metadata: { nestable: true },
};
