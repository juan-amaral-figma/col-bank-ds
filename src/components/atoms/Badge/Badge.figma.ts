// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=19-186
// source=src/components/atoms/Badge/Badge.tsx
// component=Badge
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Etiqueta');
const tone = instance.getEnum('Tono', { 'Éxito': 'success', 'Error': 'error', 'Neutral': 'neutral' });
const iconInstance = instance.findInstance('Ícono');
const iconCode =
  iconInstance && iconInstance.type === 'INSTANCE'
    ? iconInstance.executeTemplate().example
    : undefined;

export default {
  example: figma.code`<Badge
    label={${JSON.stringify(label)}}
    tone={${JSON.stringify(tone)}}
    ${iconCode ? figma.code`icon={${iconCode}}` : ''}
  />`,
  imports: ['import { Badge, Icon } from "@col-bank/react"'],
  id: 'Badge',
  metadata: { nestable: true },
};
