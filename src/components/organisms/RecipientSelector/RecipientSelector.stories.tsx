import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecipientSelector } from './RecipientSelector';

import { recipients } from '../../../../stories/shared/fixtures';
const meta = {
  title: 'Organisms/RecipientSelector',
  component: RecipientSelector,
  tags: ['autodocs'],
  args: { recipients },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=68-646',
    },
    docs: {
      description: {
        component:
          'Source component: 68:646. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof RecipientSelector>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { name: 'Default', args: {} };
export const Selected: Story = { name: 'Selected', args: { defaultValue: 'maria' } };
export const Empty: Story = { name: 'Empty', args: { recipients: [] } };
