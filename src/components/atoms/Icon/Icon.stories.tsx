import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: { name: 'home' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=19-30',
    },
    docs: {
      description: {
        component:
          'Source component: 19:30. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Home: Story = { name: 'Home', args: { name: 'home' } };
export const Transfer: Story = { name: 'Transfer', args: { name: 'transfer' } };
export const Wallet: Story = { name: 'Wallet', args: { name: 'wallet' } };
export const Creditcard: Story = { name: 'Credit card', args: { name: 'credit-card' } };
export const Search: Story = { name: 'Search', args: { name: 'search' } };
export const Notification: Story = { name: 'Notification', args: { name: 'notification' } };
export const Arrow: Story = { name: 'Arrow', args: { name: 'arrow' } };
export const Check: Story = { name: 'Check', args: { name: 'check' } };
export const Close: Story = { name: 'Close', args: { name: 'close' } };
export const Eye: Story = { name: 'Eye', args: { name: 'eye' } };
