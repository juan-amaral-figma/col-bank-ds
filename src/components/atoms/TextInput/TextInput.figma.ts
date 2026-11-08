// url=https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=19-143
// source=src/components/atoms/TextInput/TextInput.tsx
// component=TextInput
import figma from 'figma';

const instance = figma.selectedInstance;
// Focus is browser-owned (:focus-within); no persistent React state prop is invented.
// React keeps error feedback visible; Show helper controls the non-error helper text.
const label = instance.getString('Etiqueta');
const placeholder = instance.getString('Sugerencia');
const helperText = instance.getString('Texto de ayuda');
const showHelper = instance.getBoolean('Mostrar ayuda');
const state = instance.getEnum('Estado', {
  'Predeterminado': 'default',
  'En foco': 'focus',
  'Error': 'error',
  'Deshabilitado': 'disabled',
});
const errorIconInstance = instance.findInstance('Ícono');
const errorIconCode =
  errorIconInstance && errorIconInstance.type === 'INSTANCE'
    ? errorIconInstance.executeTemplate().example
    : undefined;

export default {
  example: figma.code`<TextInput
    label={${JSON.stringify(label)}}
    placeholder={${JSON.stringify(placeholder)}}
    helperText={${JSON.stringify(helperText)}}
    showHelper={${showHelper}}
    ${state === 'disabled' ? 'disabled' : ''}
    ${state === 'error' ? figma.code`error={${JSON.stringify(helperText || true)}}` : ''}
    ${errorIconCode ? figma.code`errorIcon={${errorIconCode}}` : ''}
  />`,
  imports: ['import { TextInput, Icon } from "@col-bank/react"'],
  id: 'TextInput',
  metadata: { nestable: true },
};
