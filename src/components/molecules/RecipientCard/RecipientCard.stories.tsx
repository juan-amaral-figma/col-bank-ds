import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecipientCard } from './RecipientCard';

import { recipients } from '../../../../stories/shared/fixtures';
const meta = {
  title: 'Molecules/RecipientCard',
  component: RecipientCard,
  tags: ['autodocs'],
  args: { ...recipients[0], defaultSelected: false },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=44-622',
    },
    docs: {
      description: {
        component:
          'Source component: 44:622. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof RecipientCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { name: 'Default', args: { selected: false } };
export const Selected: Story = { name: 'Selected', args: { selected: true } };
