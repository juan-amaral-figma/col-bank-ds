import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccountOverview } from './AccountOverview';

import { accounts } from '../../../../stories/shared/fixtures';
const meta = {
  title: 'Organisms/AccountOverview',
  component: AccountOverview,
  tags: ['autodocs'],
  args: { accounts },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=68-344',
    },
    docs: {
      description: {
        component:
          'Source component: 68:344. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof AccountOverview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Visible: Story = { name: 'Visible', args: { balanceHidden: false } };
export const Hidden: Story = { name: 'Hidden', args: { balanceHidden: true } };
