import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { label: 'Éxito', tone: 'success' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=19-186',
    },
    docs: {
      description: {
        component:
          'Source component: 19:186. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Success: Story = { name: 'Success', args: { tone: 'success', label: 'Éxito' } };
export const Error: Story = { name: 'Error', args: { tone: 'error', label: 'Error' } };
export const Neutral: Story = { name: 'Neutral', args: { tone: 'neutral', label: 'Pendiente' } };
