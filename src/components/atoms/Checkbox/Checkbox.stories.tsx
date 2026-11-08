import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Acepto los términos' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=19-158',
    },
    docs: {
      description: {
        component:
          'Source component: 19:158. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Unchecked: Story = { name: 'Unchecked', args: {} };
export const Checked: Story = { name: 'Checked', args: { defaultChecked: true } };
export const Disabled: Story = { name: 'Disabled', args: { disabled: true } };
