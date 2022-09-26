import { ComponentMeta, ComponentStory } from '@storybook/react';
import Badge, { IBadge } from './Badge';
import { mockBadgeProps } from './Badge.mocks';

export default {
  title: 'components/Badge',
  component: Badge,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Badge>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockBadgeProps.base,
} as IBadge;
