// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=68-344
// source=src/components/organisms/AccountOverview/AccountOverview.tsx
// component=AccountOverview
import figma from 'figma';

const instance = figma.selectedInstance;
// Balance is also reflected by the nested AccountCard states.
const heading = instance.getString('Encabezado');
const balanceHidden = instance.getEnum('Saldo', { 'Visible': false, 'Oculto': true });
const savingsAccountInstance = instance.findInstance('Cuenta de ahorro');
const savingsAccountCode =
  savingsAccountInstance && savingsAccountInstance.type === 'INSTANCE'
    ? savingsAccountInstance.executeTemplate().example
    : undefined;
const secondaryAccountInstance = instance.findInstance('Cuenta de ahorro secundaria');
const secondaryAccountCode =
  secondaryAccountInstance && secondaryAccountInstance.type === 'INSTANCE'
    ? secondaryAccountInstance.executeTemplate().example
    : undefined;

export default {
  example: figma.code`<AccountOverview
    heading={${JSON.stringify(heading)}}
    balanceHidden={${balanceHidden}}
  >
    ${savingsAccountCode}
    ${secondaryAccountCode}
  </AccountOverview>`,
  imports: [
    'import { AccountOverview, AccountCard, Icon, IconButton, Divider } from "@col-bank/react"',
  ],
  id: 'AccountOverview',
  metadata: { nestable: true },
};
