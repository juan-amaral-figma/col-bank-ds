// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=44-727
// source=src/components/molecules/SearchField/SearchField.tsx
// component=SearchField
import figma from 'figma';

const instance = figma.selectedInstance;
// Focus is browser-owned. Has Value selects the initial value; React derives later state from the input.
// The placeholder supplies an initial accessible label; review it for the product context.
const placeholder = instance.getString('Sugerencia');
const value = instance.getString('Valor');
const showClear = instance.getBoolean('Mostrar borrado');
const focus = instance.getEnum('En foco', { 'No': false, 'Sí': true });
const hasValue = instance.getEnum('Tiene valor', { 'No': false, 'Sí': true });
const searchIconInstance = instance.findInstance('Ícono de búsqueda');
const searchIconCode =
  searchIconInstance && searchIconInstance.type === 'INSTANCE'
    ? searchIconInstance.executeTemplate().example
    : undefined;
const clearButtonInstance = instance.findInstance('Botón de borrar');
const clearButtonCode =
  clearButtonInstance && clearButtonInstance.type === 'INSTANCE'
    ? clearButtonInstance.executeTemplate().example
    : undefined;

export default {
  example: figma.code`<SearchField
    placeholder={${JSON.stringify(placeholder)}}
    showClear={${showClear}}
    label={${JSON.stringify(placeholder)}}
    defaultValue={${JSON.stringify(hasValue ? value : '')}}
    ${searchIconCode ? figma.code`searchIcon={${searchIconCode}}` : ''}
    ${showClear && hasValue && clearButtonCode ? figma.code`clearButton={${clearButtonCode}}` : ''}
  />`,
  imports: ['import { SearchField, Icon, IconButton } from "@col-bank/react"'],
  id: 'SearchField',
  metadata: { nestable: true },
};
