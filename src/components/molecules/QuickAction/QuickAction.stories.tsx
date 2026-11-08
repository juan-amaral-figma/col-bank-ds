import type { Meta, StoryObj } from '@storybook/react-vite';
import { QuickAction } from './QuickAction';
import { Icon } from '../../atoms/Icon';

const meta = {
  title: 'Molecules/QuickAction',
  component: QuickAction,
  tags: ['autodocs'],
  args: { label: 'Transferir', icon: <Icon name="transfer" /> },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=44-640',
    },
    docs: {
      description: {
        component:
          'Source component: 44:640. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof QuickAction>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { name: 'Default', args: {} };
export const Disabled: Story = { name: 'Disabled', args: { disabled: true } };
