import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccountCard } from './AccountCard';

const meta = {
  title: 'Molecules/AccountCard',
  component: AccountCard,
  tags: ['autodocs'],
  args: { accountType: 'Cuenta de Ahorros', accountNumber: '•••• 4582', balance: '$2.450.000 COP' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=44-552',
    },
    docs: {
      description: {
        component:
          'Source component: 44:552. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof AccountCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { name: 'Default', args: { defaultBalanceHidden: false } };
export const BalanceHidden: Story = {
  name: 'Balance Hidden',
  args: { defaultBalanceHidden: true },
};
