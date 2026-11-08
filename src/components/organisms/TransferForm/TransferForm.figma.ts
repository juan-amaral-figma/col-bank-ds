// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=68-765
// source=src/components/organisms/TransferForm/TransferForm.tsx
// component=TransferForm
import figma from 'figma';

const instance = figma.selectedInstance;
// Default/Error/Ready are represented by the amount and button child templates.
// Custom form slots preserve visual configuration; the consuming app owns value synchronization and submission.
const heading = instance.getString('Encabezado');
const state = instance.getEnum('Estado', { 'Predeterminado': 'default', 'Error': 'error', 'Listo': 'ready' });
const recipientSummaryInstance = instance.findInstance('Resumen del destinatario');
const recipientSummaryCode =
  recipientSummaryInstance && recipientSummaryInstance.type === 'INSTANCE'
    ? recipientSummaryInstance.executeTemplate().example
    : undefined;
const amountFieldInstance = instance.findInstance(
  state === 'error' ? 'CampoDeMonto' : 'Monto de transferencia',
);
const amountFieldCode =
  amountFieldInstance && amountFieldInstance.type === 'INSTANCE'
    ? amountFieldInstance.executeTemplate().example
    : undefined;
const continueButtonInstance = instance.findInstance('Botón de continuar');
const continueButtonCode =
  continueButtonInstance && continueButtonInstance.type === 'INSTANCE'
    ? continueButtonInstance.executeTemplate().example
    : undefined;

export default {
  example: figma.code`<TransferForm
    heading={${JSON.stringify(heading)}}
    ${recipientSummaryCode ? figma.code`recipientSummary={${recipientSummaryCode}}` : ''}
    ${amountFieldCode ? figma.code`amountField={${amountFieldCode}}` : ''}
    ${continueButtonCode ? figma.code`continueButton={${continueButtonCode}}` : ''}
  />`,
  imports: [
    'import { TransferForm, RecipientCard, RadioButton, AmountField, TextInput, Icon, Button } from "@col-bank/react"',
  ],
  id: 'TransferForm',
  metadata: { nestable: true },
};
