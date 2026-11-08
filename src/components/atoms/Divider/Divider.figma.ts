// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=19-192
// source=src/components/atoms/Divider/Divider.tsx
// component=Divider
import figma from 'figma';

const instance = figma.selectedInstance;

const orientation = instance.getEnum('Orientación', {
  'Horizontal': 'horizontal',
  'Vertical': 'vertical',
});

export default {
  example: figma.code`<Divider
    orientation={${JSON.stringify(orientation)}}
  />`,
  imports: ['import { Divider } from "@col-bank/react"'],
  id: 'Divider',
  metadata: { nestable: true },
};
