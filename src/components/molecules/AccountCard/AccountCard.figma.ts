// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=44-552
// source=src/components/molecules/AccountCard/AccountCard.tsx
// component=AccountCard
import figma from 'figma';

const instance = figma.selectedInstance;
// Custom visibilityButton composition preserves Figma overrides; wire its action in the consuming app.
const accountType = instance.getString('Tipo de cuenta');
const accountNumber = instance.getString('Número de cuenta');
const balance = instance.getString('Saldo');
const balanceHidden = instance.getEnum('Estado', { Predeterminado: false, 'Saldo oculto': true });
const slot = instance.getSlot('Contenido');
const children = slot?.connectedInstances.map((child) => child.executeTemplate().example) ?? [];
const content = children.flat();
const balanceLabelLayer = instance.findText('Etiqueta del saldo');
const balanceLabel = balanceLabelLayer.type === 'TEXT' ? balanceLabelLayer.textContent : undefined;
const iconInstance = instance.findInstance('Ícono');
const iconCode =
  iconInstance && iconInstance.type === 'INSTANCE'
    ? iconInstance.executeTemplate().example
    : undefined;
const visibilityButtonInstance = instance.findInstance('Botón de visibilidad del saldo');
const visibilityButtonCode =
  visibilityButtonInstance && visibilityButtonInstance.type === 'INSTANCE'
    ? visibilityButtonInstance.executeTemplate().example
    : undefined;
const dividerInstance = instance.findInstance('Separador');
const dividerCode =
  dividerInstance && dividerInstance.type === 'INSTANCE'
    ? dividerInstance.executeTemplate().example
    : undefined;

export default {
  example: figma.code`<AccountCard
    accountType={${JSON.stringify(accountType)}}
    accountNumber={${JSON.stringify(accountNumber)}}
    balance={${JSON.stringify(balance)}}
    defaultBalanceHidden={${balanceHidden}}
    ${balanceLabel !== undefined ? figma.code`balanceLabel={${JSON.stringify(balanceLabel)}}` : ''}
    ${iconCode ? figma.code`icon={${iconCode}}` : ''}
    ${visibilityButtonCode ? figma.code`visibilityButton={${visibilityButtonCode}}` : ''}
    ${dividerCode ? figma.code`divider={${dividerCode}}` : ''}
  >
    ${content}
  </AccountCard>`,
  imports: [
    'import { AccountCard, Icon, IconButton, Divider, Alert, Button } from "@col-bank/react"',
  ],
  id: 'AccountCard',
  metadata: { nestable: true },
};
