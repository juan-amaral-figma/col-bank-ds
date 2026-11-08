// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=68-646
// source=src/components/organisms/RecipientSelector/RecipientSelector.tsx
// component=RecipientSelector
import figma from 'figma';

const instance = figma.selectedInstance;
// Default/Selected are represented by the nested RecipientCard states; Empty renders without child cards.
const heading = instance.getString('Encabezado');
const state = instance.getEnum('Estado', {
  'Predeterminado': 'default',
  'Seleccionado': 'selected',
  'Vacío': 'empty',
});
const searchFieldInstance = instance.findInstance('Buscar destinatarios');
const searchFieldCode =
  searchFieldInstance && searchFieldInstance.type === 'INSTANCE'
    ? searchFieldInstance.executeTemplate().example
    : undefined;
const emptyHeadingLayer = instance.findText('No encontramos destinatarios');
const emptyHeading = emptyHeadingLayer.type === 'TEXT' ? emptyHeadingLayer.textContent : undefined;
const emptyDescriptionLayer = instance.findText('Prueba con otro nombre o número de cuenta.');
const emptyDescription =
  emptyDescriptionLayer.type === 'TEXT' ? emptyDescriptionLayer.textContent : undefined;
const recipient0Instance = instance.findInstance('Destinatario principal');
const recipient0Code =
  recipient0Instance && recipient0Instance.type === 'INSTANCE'
    ? recipient0Instance.executeTemplate().example
    : undefined;
const recipient1Instance = instance.findInstance('Destinatario secundario');
const recipient1Code =
  recipient1Instance && recipient1Instance.type === 'INSTANCE'
    ? recipient1Instance.executeTemplate().example
    : undefined;
const example =
  state === 'empty'
    ? figma.code`<RecipientSelector
    heading={${JSON.stringify(heading)}}
    ${searchFieldCode ? figma.code`searchField={${searchFieldCode}}` : ''}
    ${emptyHeading !== undefined ? figma.code`emptyHeading={${JSON.stringify(emptyHeading)}}` : ''}
    ${emptyDescription !== undefined ? figma.code`emptyDescription={${JSON.stringify(emptyDescription)}}` : ''}
  />`
    : figma.code`<RecipientSelector
    heading={${JSON.stringify(heading)}}
    ${searchFieldCode ? figma.code`searchField={${searchFieldCode}}` : ''}
    ${emptyHeading !== undefined ? figma.code`emptyHeading={${JSON.stringify(emptyHeading)}}` : ''}
    ${emptyDescription !== undefined ? figma.code`emptyDescription={${JSON.stringify(emptyDescription)}}` : ''}
  >
    ${recipient0Code}
    ${recipient1Code}
  </RecipientSelector>`;

export default {
  example: example,
  imports: [
    'import { RecipientSelector, SearchField, Icon, IconButton, RecipientCard, RadioButton } from "@col-bank/react"',
  ],
  id: 'RecipientSelector',
  metadata: { nestable: true },
};
