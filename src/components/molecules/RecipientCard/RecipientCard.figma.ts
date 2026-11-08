// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=44-622
// source=src/components/molecules/RecipientCard/RecipientCard.tsx
// component=RecipientCard
import figma from 'figma';

const instance = figma.selectedInstance;
// The nested radio preserves its own Figma properties; supply group names and selection callbacks in the consuming app.
const initials = instance.getString('Iniciales');
const recipientName = instance.getString('Nombre del destinatario');
const bank = instance.getString('Banco');
const accountNumber = instance.getString('Número de cuenta');
const selected = instance.getEnum('Estado', { 'Predeterminado': false, 'Seleccionado': true });
const selectionControlInstance = instance.findInstance('Control de selección');
const selectionControlCode =
  selectionControlInstance && selectionControlInstance.type === 'INSTANCE'
    ? selectionControlInstance.executeTemplate().example
    : undefined;

export default {
  example: figma.code`<RecipientCard
    initials={${JSON.stringify(initials)}}
    recipientName={${JSON.stringify(recipientName)}}
    bank={${JSON.stringify(bank)}}
    accountNumber={${JSON.stringify(accountNumber)}}
    defaultSelected={${selected}}
    ${selectionControlCode ? figma.code`selectionControl={${selectionControlCode}}` : ''}
  />`,
  imports: ['import { RecipientCard, RadioButton } from "@col-bank/react"'],
  id: 'RecipientCard',
  metadata: { nestable: true },
};
