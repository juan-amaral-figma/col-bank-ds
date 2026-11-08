// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=44-597
// source=src/components/molecules/TransactionItem/TransactionItem.tsx
// component=TransactionItem
import figma from 'figma';

const instance = figma.selectedInstance;

const transactionName = instance.getString('Nombre del movimiento');
const date = instance.getString('Fecha');
const amount = instance.getString('Monto');
const showStatus = instance.getBoolean('Mostrar estado');
const direction = instance.getEnum('Dirección', { 'Entrada': 'incoming', 'Salida': 'outgoing' });
const status = instance.getEnum('Estado', { 'Completado': 'completed', 'Pendiente': 'pending' });
const iconInstance = instance.findInstance('Ícono');
const iconCode =
  iconInstance && iconInstance.type === 'INSTANCE'
    ? iconInstance.executeTemplate().example
    : undefined;
const statusBadgeInstance = instance.findInstance('Insignia de estado');
const statusBadgeCode =
  statusBadgeInstance && statusBadgeInstance.type === 'INSTANCE'
    ? statusBadgeInstance.executeTemplate().example
    : undefined;

export default {
  example: figma.code`<TransactionItem
    transactionName={${JSON.stringify(transactionName)}}
    date={${JSON.stringify(date)}}
    amount={${JSON.stringify(amount)}}
    showStatus={${showStatus}}
    direction={${JSON.stringify(direction)}}
    status={${JSON.stringify(status)}}
    ${iconCode ? figma.code`icon={${iconCode}}` : ''}
    ${showStatus && statusBadgeCode ? figma.code`statusBadge={${statusBadgeCode}}` : ''}
  />`,
  imports: ['import { TransactionItem, Icon, Badge } from "@col-bank/react"'],
  id: 'TransactionItem',
  metadata: { nestable: true },
};
