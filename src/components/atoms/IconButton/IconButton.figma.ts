// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=19-113
// source=src/components/atoms/IconButton/IconButton.tsx
// component=IconButton
import figma from 'figma';

const instance = figma.selectedInstance;
// Review the accessible label for the action in its product context.
const size = instance.getEnum('Tamaño', { 'Pequeño': 'sm', 'Mediano': 'md' });
const state = instance.getEnum('Estado', { 'Predeterminado': 'default', 'Deshabilitado': 'disabled' });
const iconInstance = instance.findInstance('Ícono');
const iconResult =
  iconInstance && iconInstance.type === 'INSTANCE' ? iconInstance.executeTemplate() : undefined;
const iconCode = iconResult?.example;
const iconName = iconResult?.metadata?.props?.name;
const actionLabels = {
  home: 'Inicio',
  transfer: 'Transferir',
  wallet: 'Billetera',
  'credit-card': 'Tarjeta',
  search: 'Buscar',
  notification: 'Notificaciones',
  arrow: 'Continuar',
  check: 'Confirmar',
  close: 'Cerrar',
  eye: 'Mostrar u ocultar saldo',
};
const accessibleLabel =
  Object.entries(actionLabels).find(([name]) => name === iconName)?.[1] ?? 'Acción';

export default {
  example: figma.code`<IconButton
    size={${JSON.stringify(size)}}
    ${state === 'disabled' ? 'disabled' : ''}
    icon={${iconCode}}
    aria-label={${JSON.stringify(accessibleLabel)}}
  />`,
  imports: ['import { IconButton, Icon } from "@col-bank/react"'],
  id: 'IconButton',
  metadata: { nestable: true },
};
