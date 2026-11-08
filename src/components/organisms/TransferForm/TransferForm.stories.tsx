import type { Meta, StoryObj } from '@storybook/react-vite';
import { TransferForm } from './TransferForm';

import { recipients } from '../../../../stories/shared/fixtures';
const meta = {
  title: 'Organisms/TransferForm',
  component: TransferForm,
  tags: ['autodocs'],
  args: { recipient: recipients[0] },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/vLy0B4TiccE51qO2z2Sek3/Col-Bank---Design-System?node-id=68-765',
    },
    docs: {
      description: {
        component:
          'Source component: 68:765. Use the theme toolbar to compare light and dark modes.',
      },
    },
  },
} satisfies Meta<typeof TransferForm>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { name: 'Default', args: {} };
export const Error: Story = { name: 'Error', args: { error: 'Revisa el valor ingresado' } };
export const Ready: Story = { name: 'Ready', args: { defaultAmount: '250000' } };
