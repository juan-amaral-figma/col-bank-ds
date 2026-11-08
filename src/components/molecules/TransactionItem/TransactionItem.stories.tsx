import type { Meta, StoryObj } from '@storybook/react-vite';
import { TransactionItem } from './TransactionItem';

const meta = {
  title: 'Molecules/TransactionItem',
  component: TransactionItem,
  tags: ['autodocs'],
  args: { transactionName: 'Transferencia', date: '13 oct 2026', amount: '150.000' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=44-597',
    },
    docs: {
      description: {
        component:
          'Source component: 44:597. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof TransactionItem>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Incoming_Completed: Story = {
  name: 'Incoming / Completed',
  args: { direction: 'incoming', status: 'completed' },
};
export const Incoming_Pending: Story = {
  name: 'Incoming / Pending',
  args: { direction: 'incoming', status: 'pending' },
};
export const Outgoing_Completed: Story = {
  name: 'Outgoing / Completed',
  args: { direction: 'outgoing', status: 'completed' },
};
export const Outgoing_Pending: Story = {
  name: 'Outgoing / Pending',
  args: { direction: 'outgoing', status: 'pending' },
};
