import type { Meta, StoryObj } from '@storybook/react-vite';
import { QuickActionsPanel } from './QuickActionsPanel';

import { actions } from '../../../../stories/shared/fixtures';
const meta = {
  title: 'Organisms/QuickActionsPanel',
  component: QuickActionsPanel,
  tags: ['autodocs'],
  args: { actions },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=68-425',
    },
    docs: {
      description: {
        component:
          'Source component: 68:425. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof QuickActionsPanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { name: 'Default', args: {} };
export const Disabled: Story = { name: 'Disabled', args: { disabled: true } };
