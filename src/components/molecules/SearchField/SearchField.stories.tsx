import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchField } from './SearchField';

const meta = {
  title: 'Molecules/SearchField',
  component: SearchField,
  tags: ['autodocs'],
  args: { label: 'Buscar destinatarios', placeholder: 'Buscar destinatario' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=44-727',
    },
    docs: {
      description: {
        component:
          'Source component: 44:727. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof SearchField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const False_False: Story = { name: 'False / False', args: { defaultValue: '' } };
export const False_True: Story = { name: 'False / True', args: { defaultValue: 'María' } };
export const True_False: Story = {
  name: 'True / False',
  args: { defaultValue: '' },
  play: async ({ canvasElement }) => {
    canvasElement.querySelector('input')?.focus();
  },
};
export const True_True: Story = {
  name: 'True / True',
  args: { defaultValue: 'María' },
  play: async ({ canvasElement }) => {
    canvasElement.querySelector('input')?.focus();
  },
};
