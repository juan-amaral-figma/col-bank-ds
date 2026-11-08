import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButton } from './RadioButton';

const meta = {
  title: 'Atoms/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  args: { label: 'Cuenta de ahorros', name: 'account-type' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=19-172',
    },
    docs: {
      description: {
        component:
          'Source component: 19:172. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof RadioButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Unselected: Story = { name: 'Unselected', args: {} };
export const Selected: Story = { name: 'Selected', args: { defaultChecked: true } };
export const Disabled: Story = { name: 'Disabled', args: { disabled: true } };
