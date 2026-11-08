import type { Meta, StoryObj } from '@storybook/react-vite';
import tokens from '../src/foundations/tokens/tokens.json';
const meta = {
  title: 'Foundations/Tokens',
  parameters: {
    docs: {
      description: {
        component:
          'Exact Figma variables. Col Bank inherits Col Base; inherited variables are not duplicated.',
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Colors: Story = {
  render: (_, context) => {
    const colors = context.globals.theme === 'dark' ? tokens.dark : tokens.light;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
        }}
      >
        {Object.entries(colors).map(([name, value]) => (
          <div
            key={name}
            style={{
              padding: 16,
              border: '1px solid var(--col-border-primary)',
              borderRadius: 12,
            }}
          >
            <div
              style={{
                height: 80,
                background: `var(--col-${name.replaceAll('/', '-')})`,
                border: '1px solid var(--col-border-primary)',
                borderRadius: 8,
              }}
            />
            <p>{name}</p>
            <code>{value}</code>
          </div>
        ))}
      </div>
    );
  },
};
export const Spacing: Story = {
  render: () => (
    <div className="col-stack">
      {Object.entries(tokens.spacing).map(([name, value]) => (
        <div key={name} className="col-row">
          <code style={{ minWidth: 120 }}>
            {name} · {value}px
          </code>
          <div style={{ width: value, height: 24, background: 'var(--col-surface-brand)' }} />
        </div>
      ))}
    </div>
  ),
};
export const Radius: Story = {
  render: () => (
    <div className="col-row" style={{ flexWrap: 'wrap' }}>
      {Object.entries(tokens.radius).map(([name, value]) => (
        <div
          key={name}
          style={{
            padding: 20,
            borderRadius: value,
            border: '1px solid var(--col-border-primary)',
          }}
        >
          {name} · {value}px
        </div>
      ))}
    </div>
  ),
};
export const Typography: Story = {
  render: () => (
    <div className="col-stack">
      {[
        'heading-large',
        'heading-medium',
        'heading-small',
        'body-regular',
        'body-small',
        'label-small',
        'money',
      ].map((name) => (
        <div key={name} className={`col-${name}`}>
          {name === 'money' ? '$2.450.000 COP' : `Col Bank — ${name}`}
        </div>
      ))}
    </div>
  ),
};
