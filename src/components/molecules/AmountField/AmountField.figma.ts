// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=44-690
// source=src/components/molecules/AmountField/AmountField.tsx
// component=AmountField
import figma from 'figma';

const instance = figma.selectedInstance;
// Focus is browser-owned. Error uses the source helper text; applications provide their validation message.
// The outer defaultValue supplies the editable Amount; the nested TextInput placeholder is not the amount.
const label = instance.getString('Etiqueta');
const currency = instance.getString('Moneda');
const amount = instance.getString('Monto');
const helperText = instance.getString('Texto de ayuda');
const state = instance.getEnum('Estado', {
  'Predeterminado': 'default',
  'En foco': 'focus',
  'Error': 'error',
  'Deshabilitado': 'disabled',
});
const amountInputInstance = instance.findInstance('Entrada de monto');
const amountInputCode =
  amountInputInstance && amountInputInstance.type === 'INSTANCE'
    ? amountInputInstance.executeTemplate().example
    : undefined;

export default {
  example: figma.code`<AmountField
    label={${JSON.stringify(label)}}
    currency={${JSON.stringify(currency)}}
    defaultValue={${JSON.stringify(amount)}}
    helperText={${JSON.stringify(helperText)}}
    ${state === 'disabled' ? 'disabled' : ''}
    ${state === 'error' ? figma.code`error={${JSON.stringify(helperText || true)}}` : ''}
    ${amountInputCode ? figma.code`amountInput={${amountInputCode}}` : ''}
  />`,
  imports: ['import { AmountField, TextInput, Icon } from "@col-bank/react"'],
  id: 'AmountField',
  metadata: { nestable: true },
};
