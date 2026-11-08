import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInput } from './TextInput';

const meta = {
  title: 'Atoms/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  args: {
    label: 'Número de cuenta',
    placeholder: 'Ingresa tu número',
    helperText: 'Usa los dígitos de tu cuenta',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=19-143',
    },
    docs: {
      description: {
        component:
          'Source component: 19:143. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof TextInput>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { name: 'Default', args: {} };
export const Focus: Story = {
  name: 'Focus',
  args: {},
  play: async ({ canvasElement }) => {
    canvasElement.querySelector('input')?.focus();
  },
};
export const Error: Story = { name: 'Error', args: { error: 'Revisa el valor ingresado' } };
export const Disabled: Story = { name: 'Disabled', args: { disabled: true } };
