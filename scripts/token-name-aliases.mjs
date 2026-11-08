// Figma names are Spanish. The exported CSS and React token contract remain English.
// Keep these aliases explicit to avoid breaking existing consumers on a Figma rename.
const spanishToCode = {
  amarillo: 'yellow',
  verde: 'green',
  rojo: 'red',
  texto: 'text',
  primario: 'primary',
  secundario: 'secondary',
  inverso: 'inverse',
  marca: 'brand',
  superficie: 'surface',
  borde: 'border',
  espaciado: 'spacing',
  radio: 'radius',
  ninguno: 'none',
  pequeño: 'sm',
  mediano: 'md',
  grande: 'lg',
  'extra-grande': 'xl',
  'extra-extra-grande': '2xl',
  estado: 'status',
  éxito: 'success',
  'sobre-marca': 'on-brand',
};

export function toCodeTokenName(figmaName) {
  return figmaName
    .split('/')
    .map((part) => spanishToCode[part] ?? part)
    .join('/');
}
