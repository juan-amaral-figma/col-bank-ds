import type { Meta, StoryObj } from '@storybook/react-vite';
import { TransactionHistory } from './TransactionHistory';

import { transactions } from '../../../../stories/shared/fixtures';
const meta = {
  title: 'Organisms/TransactionHistory',
  component: TransactionHistory,
  tags: ['autodocs'],
  args: { transactions },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=68-497',
    },
    docs: {
      description: {
        component:
          'Source component: 68:497. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof TransactionHistory>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Recent: Story = { name: 'Recent', args: {} };
export const Empty: Story = { name: 'Empty', args: { transactions: [] } };
