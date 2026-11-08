import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';
import { Icon } from '../Icon';

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { icon: <Icon name="search" />, 'aria-label': 'Buscar' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=19-113',
    },
    docs: {
      description: {
        component:
          'Source component: 19:113. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Default_Small: Story = { name: 'Default / Small', args: { size: 'sm' } };
export const Default_Medium: Story = { name: 'Default / Medium', args: { size: 'md' } };
export const Disabled_Small: Story = {
  name: 'Disabled / Small',
  args: { disabled: true, size: 'sm' },
};
export const Disabled_Medium: Story = {
  name: 'Disabled / Medium',
  args: { disabled: true, size: 'md' },
};
