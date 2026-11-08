import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  args: {},
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=19-192',
    },
    docs: {
      description: {
        component:
          'Source component: 19:192. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof Divider>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Horizontal: Story = { name: 'Horizontal', args: { orientation: 'horizontal' } };
export const Vertical: Story = { name: 'Vertical', args: { orientation: 'vertical' } };
