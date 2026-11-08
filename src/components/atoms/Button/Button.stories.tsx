import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Continuar' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=19-97',
    },
    docs: {
      description: {
        component:
          'Source component: 19:97. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Primary_Default_Small: Story = {
  name: 'Primary / Default / Small',
  args: { hierarchy: 'primary', size: 'sm' },
};
export const Primary_Default_Medium: Story = {
  name: 'Primary / Default / Medium',
  args: { hierarchy: 'primary', size: 'md' },
};
export const Primary_Default_Large: Story = {
  name: 'Primary / Default / Large',
  args: { hierarchy: 'primary', size: 'lg' },
};
export const Primary_Disabled_Small: Story = {
  name: 'Primary / Disabled / Small',
  args: { hierarchy: 'primary', disabled: true, size: 'sm' },
};
export const Primary_Disabled_Medium: Story = {
  name: 'Primary / Disabled / Medium',
  args: { hierarchy: 'primary', disabled: true, size: 'md' },
};
export const Primary_Disabled_Large: Story = {
  name: 'Primary / Disabled / Large',
  args: { hierarchy: 'primary', disabled: true, size: 'lg' },
};
export const Primary_Loading_Small: Story = {
  name: 'Primary / Loading / Small',
  args: { hierarchy: 'primary', loading: true, size: 'sm' },
};
export const Primary_Loading_Medium: Story = {
  name: 'Primary / Loading / Medium',
  args: { hierarchy: 'primary', loading: true, size: 'md' },
};
export const Primary_Loading_Large: Story = {
  name: 'Primary / Loading / Large',
  args: { hierarchy: 'primary', loading: true, size: 'lg' },
};
export const Secondary_Default_Small: Story = {
  name: 'Secondary / Default / Small',
  args: { hierarchy: 'secondary', size: 'sm' },
};
export const Secondary_Default_Medium: Story = {
  name: 'Secondary / Default / Medium',
  args: { hierarchy: 'secondary', size: 'md' },
};
export const Secondary_Default_Large: Story = {
  name: 'Secondary / Default / Large',
  args: { hierarchy: 'secondary', size: 'lg' },
};
export const Secondary_Disabled_Small: Story = {
  name: 'Secondary / Disabled / Small',
  args: { hierarchy: 'secondary', disabled: true, size: 'sm' },
};
export const Secondary_Disabled_Medium: Story = {
  name: 'Secondary / Disabled / Medium',
  args: { hierarchy: 'secondary', disabled: true, size: 'md' },
};
export const Secondary_Disabled_Large: Story = {
  name: 'Secondary / Disabled / Large',
  args: { hierarchy: 'secondary', disabled: true, size: 'lg' },
};
export const Secondary_Loading_Small: Story = {
  name: 'Secondary / Loading / Small',
  args: { hierarchy: 'secondary', loading: true, size: 'sm' },
};
export const Secondary_Loading_Medium: Story = {
  name: 'Secondary / Loading / Medium',
  args: { hierarchy: 'secondary', loading: true, size: 'md' },
};
export const Secondary_Loading_Large: Story = {
  name: 'Secondary / Loading / Large',
  args: { hierarchy: 'secondary', loading: true, size: 'lg' },
};
export const Tertiary_Default_Small: Story = {
  name: 'Tertiary / Default / Small',
  args: { hierarchy: 'tertiary', size: 'sm' },
};
export const Tertiary_Default_Medium: Story = {
  name: 'Tertiary / Default / Medium',
  args: { hierarchy: 'tertiary', size: 'md' },
};
export const Tertiary_Default_Large: Story = {
  name: 'Tertiary / Default / Large',
  args: { hierarchy: 'tertiary', size: 'lg' },
};
export const Tertiary_Disabled_Small: Story = {
  name: 'Tertiary / Disabled / Small',
  args: { hierarchy: 'tertiary', disabled: true, size: 'sm' },
};
export const Tertiary_Disabled_Medium: Story = {
  name: 'Tertiary / Disabled / Medium',
  args: { hierarchy: 'tertiary', disabled: true, size: 'md' },
};
export const Tertiary_Disabled_Large: Story = {
  name: 'Tertiary / Disabled / Large',
  args: { hierarchy: 'tertiary', disabled: true, size: 'lg' },
};
export const Tertiary_Loading_Small: Story = {
  name: 'Tertiary / Loading / Small',
  args: { hierarchy: 'tertiary', loading: true, size: 'sm' },
};
export const Tertiary_Loading_Medium: Story = {
  name: 'Tertiary / Loading / Medium',
  args: { hierarchy: 'tertiary', loading: true, size: 'md' },
};
export const Tertiary_Loading_Large: Story = {
  name: 'Tertiary / Loading / Large',
  args: { hierarchy: 'tertiary', loading: true, size: 'lg' },
};
export const KeyboardFocus: Story = {
  play: async ({ canvasElement }) => {
    canvasElement.querySelector('button')?.focus();
  },
};
