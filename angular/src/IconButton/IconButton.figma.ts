// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/COL-BANK?node-id=19-113
// source=src/IconButton/icon-button.ts
// component=IconButton
import figma from 'figma';

const instance = figma.selectedInstance;
const size = instance.getEnum('Tamaño', { Pequeño: 'sm', Mediano: 'md' });
const disabled = instance.getEnum('Estado', { Predeterminado: false, Deshabilitado: true });

// TESTS:

const iconLookup = { method: 'findInstance', value: 'Ícono' } as const;
// const iconLookup = { method: 'findConnectedInstance', value: 'Icon' } as const;
// const iconLookup = { method: 'getInstanceSwap', value: 'Icono intercambiable' } as const;
// const iconLookup = { method: 'getInstanceSwap', value: 'PROPRIEDAD_INEXISTENTE' } as const;
const iconInstance = instance[iconLookup.method](iconLookup.value);

if (!iconInstance || iconInstance.type !== 'INSTANCE') {
  throw new Error(`IconButton: el método ${iconLookup.method}('${iconLookup.value}') no devolvió una instancia válida.`);
}
const iconResult = iconInstance.executeTemplate();
const name = iconResult.metadata?.props?.name;
if (typeof name !== 'string') {
  throw new Error('IconButton: the connected Icon template must expose metadata.props.name.');
}

const actionLabels: Record<string, string> = {
  home: 'Ir al inicio',
  transfer: 'Transferir',
  wallet: 'Ver billetera',
  'credit-card': 'Ver tarjeta',
  search: 'Buscar',
  notification: 'Ver notificaciones',
  arrow: 'Continuar',
  check: 'Confirmar',
  close: 'Cerrar',
  eye: 'Ocultar saldo',
  'eye-off': 'Mostrar saldo',
  payment: 'Pagar',
  info: 'Ver información',
};
const label = actionLabels[name];
if (!label) {
  throw new Error('IconButton: no accessible action label is defined for the connected icon.');
}

export default {
  example: figma.code`<!-- Método de búsqueda: ${iconLookup.method}('${iconLookup.value}'); ícono encontrado: ${name} -->
<button colIconButton icon="${name}" label="${label}" size="${size}" [disabled]="${disabled}"></button>`,
  id: 'IconButton',
  metadata: { nestable: true },
};
