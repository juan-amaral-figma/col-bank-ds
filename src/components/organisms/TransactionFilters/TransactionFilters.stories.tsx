import type { Meta, StoryObj } from '@storybook/react-vite';
import { TransactionFilters } from './TransactionFilters';

const meta = {
  title: 'Organisms/TransactionFilters',
  component: TransactionFilters,
  tags: ['autodocs'],
  args: {},
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=68-556',
    },
    docs: {
      description: {
        component:
          'Source component: 68:556. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof TransactionFilters>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Todos: Story = { name: 'Todos', args: { defaultValue: 'all' } };
export const Entradas: Story = { name: 'Entradas', args: { defaultValue: 'incoming' } };
export const Salidas: Story = { name: 'Salidas', args: { defaultValue: 'outgoing' } };
export const Pendientes: Story = { name: 'Pendientes', args: { defaultValue: 'pending' } };
