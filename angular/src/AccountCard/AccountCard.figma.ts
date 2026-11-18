// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/COL-BANK?node-id=44-552
// source=src/AccountCard/account-card.ts
// component=AccountCard
import figma from 'figma';

const instance = figma.selectedInstance;
const accountType = instance.getString('Tipo de cuenta');
const accountNumber = instance.getString('Número de cuenta');
const balance = instance.getString('Saldo');
// Use initial state, not a controlled balanceHidden binding, so Angular can toggle it internally.
const defaultBalanceHidden = instance.getEnum('Estado', {
  Predeterminado: false,
  'Saldo oculto': true,
});
const balanceLabelLayer = instance.findText('Etiqueta del saldo');
const balanceLabel = balanceLabelLayer.type === 'TEXT' ? balanceLabelLayer.textContent : undefined;
const slot = instance.getSlot('Contenido');
const children = slot?.connectedInstances.map((child) => child.executeTemplate().example) ?? [];
const content = children.flat();

function html(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default {
  example: figma.code`<col-account-card
  accountType="${html(accountType)}"
  accountNumber="${html(accountNumber)}"
  balance="${html(balance)}"
  [defaultBalanceHidden]="${defaultBalanceHidden}"
  ${balanceLabel !== undefined ? figma.code`balanceLabel="${html(balanceLabel)}"` : ''}
>
  ${content}
</col-account-card>`,
  id: 'AccountCard',
  metadata: { nestable: true },
};
