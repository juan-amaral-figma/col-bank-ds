// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=68-497
// source=src/components/organisms/TransactionHistory/TransactionHistory.tsx
// component=TransactionHistory
import figma from 'figma';

const instance = figma.selectedInstance;
// Empty uses the component's empty-data rendering; Recent preserves the configured child instances.
const heading = instance.getString('Encabezado');
const state = instance.getEnum('Estado', { 'Reciente': 'recent', 'Vacío': 'empty' });
const searchFieldInstance = instance.findInstance('Buscar movimientos');
const searchFieldCode =
  searchFieldInstance && searchFieldInstance.type === 'INSTANCE'
    ? searchFieldInstance.executeTemplate().example
    : undefined;
const emptyHeadingLayer = instance.findText('Aún no tienes movimientos');
const emptyHeading = emptyHeadingLayer.type === 'TEXT' ? emptyHeadingLayer.textContent : undefined;
const emptyDescriptionLayer = instance.findText('Tus entradas y salidas aparecerán aquí.');
const emptyDescription =
  emptyDescriptionLayer.type === 'TEXT' ? emptyDescriptionLayer.textContent : undefined;
const transaction0Instance = instance.findInstance('Movimiento de entrada');
const transaction0Code =
  transaction0Instance && transaction0Instance.type === 'INSTANCE'
    ? transaction0Instance.executeTemplate().example
    : undefined;
const transaction1Instance = instance.findInstance('Movimiento de salida');
const transaction1Code =
  transaction1Instance && transaction1Instance.type === 'INSTANCE'
    ? transaction1Instance.executeTemplate().example
    : undefined;
const transaction2Instance = instance.findInstance('Movimiento pendiente');
const transaction2Code =
  transaction2Instance && transaction2Instance.type === 'INSTANCE'
    ? transaction2Instance.executeTemplate().example
    : undefined;
const example =
  state === 'empty'
    ? figma.code`<TransactionHistory
    heading={${JSON.stringify(heading)}}
    ${searchFieldCode ? figma.code`searchField={${searchFieldCode}}` : ''}
    ${emptyHeading !== undefined ? figma.code`emptyHeading={${JSON.stringify(emptyHeading)}}` : ''}
    ${emptyDescription !== undefined ? figma.code`emptyDescription={${JSON.stringify(emptyDescription)}}` : ''}
  />`
    : figma.code`<TransactionHistory
    heading={${JSON.stringify(heading)}}
    ${searchFieldCode ? figma.code`searchField={${searchFieldCode}}` : ''}
    ${emptyHeading !== undefined ? figma.code`emptyHeading={${JSON.stringify(emptyHeading)}}` : ''}
    ${emptyDescription !== undefined ? figma.code`emptyDescription={${JSON.stringify(emptyDescription)}}` : ''}
  >
    ${transaction0Code}
    ${transaction1Code}
    ${transaction2Code}
  </TransactionHistory>`;

export default {
  example: example,
  imports: [
    'import { TransactionHistory, SearchField, Icon, IconButton, TransactionItem, Badge } from "@col-bank/react"',
  ],
  id: 'TransactionHistory',
  metadata: { nestable: true },
};
