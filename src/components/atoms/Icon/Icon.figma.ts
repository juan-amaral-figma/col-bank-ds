// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=19-30
// source=src/components/atoms/Icon/Icon.tsx
// component=Icon
import figma from 'figma';

const instance = figma.selectedInstance;

const name = instance.getEnum('Nombre', {
  Inicio: 'home',
  Transferencia: 'transfer',
  Billetera: 'wallet',
  'Tarjeta de crédito': 'credit-card',
  Buscar: 'search',
  Notificación: 'notification',
  Flecha: 'arrow',
  'Marca de verificación': 'check',
  Cerrar: 'close',
  Ojo: 'eye',
  'Ojo cerrado': 'eye-off',
  Pago: 'payment',
  Información: 'info',
});

export default {
  example: figma.code`<Icon
    name={${JSON.stringify(name)}}
  />`,
  imports: ['import { Icon } from "@col-bank/react"'],
  id: 'Icon',
  metadata: { nestable: true, props: { name } },
};
