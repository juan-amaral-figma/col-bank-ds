import type { Meta, StoryObj } from '@storybook/react-vite';
import { AmountField } from './AmountField';

const meta = {
  title: 'Molecules/AmountField',
  component: AmountField,
  tags: ['autodocs'],
  args: {
    currency: 'COP',
    label: 'Monto',
    placeholder: '0,00',
    helperText: 'Ingresa un monto en pesos',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=44-690',
    },
    docs: {
      description: {
        component:
          'Source component: 44:690. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof AmountField>;
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
