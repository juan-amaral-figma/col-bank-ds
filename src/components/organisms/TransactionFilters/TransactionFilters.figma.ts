// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=68-556
// source=src/components/organisms/TransactionFilters/TransactionFilters.tsx
// component=TransactionFilters
import figma from 'figma';

const instance = figma.selectedInstance;
// Selected is reflected in the nested button hierarchies; wire callbacks when supplying custom children.
const selected = instance.getEnum('Seleccionado', {
  'Todos': 'all',
  'Entradas': 'incoming',
  'Salidas': 'outgoing',
  'Pendientes': 'pending',
});
const labelLayer = instance.findText('Filtrar movimientos');
const label = labelLayer.type === 'TEXT' ? labelLayer.textContent : undefined;
const iconInstance = instance.findInstance('Ícono de filtro');
const iconCode =
  iconInstance && iconInstance.type === 'INSTANCE'
    ? iconInstance.executeTemplate().example
    : undefined;
const filter0Instance = instance.findInstance('Todos');
const filter0Code =
  filter0Instance && filter0Instance.type === 'INSTANCE'
    ? filter0Instance.executeTemplate().example
    : undefined;
const filter1Instance = instance.findInstance('Entradas');
const filter1Code =
  filter1Instance && filter1Instance.type === 'INSTANCE'
    ? filter1Instance.executeTemplate().example
    : undefined;
const filter2Instance = instance.findInstance('Salidas');
const filter2Code =
  filter2Instance && filter2Instance.type === 'INSTANCE'
    ? filter2Instance.executeTemplate().example
    : undefined;
const filter3Instance = instance.findInstance('Pendientes');
const filter3Code =
  filter3Instance && filter3Instance.type === 'INSTANCE'
    ? filter3Instance.executeTemplate().example
    : undefined;

export default {
  example: figma.code`<TransactionFilters
    defaultValue={${JSON.stringify(selected)}}
    ${label !== undefined ? figma.code`label={${JSON.stringify(label)}}` : ''}
    ${iconCode ? figma.code`icon={${iconCode}}` : ''}
  >
    ${filter0Code}
    ${filter1Code}
    ${filter2Code}
    ${filter3Code}
  </TransactionFilters>`,
  imports: ['import { TransactionFilters, Icon, Button } from "@col-bank/react"'],
  id: 'TransactionFilters',
  metadata: { nestable: true },
};
