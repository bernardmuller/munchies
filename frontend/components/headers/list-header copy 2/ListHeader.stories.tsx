import { ComponentMeta, ComponentStory } from '@storybook/react';
import ListHeader, { IListHeader } from './ListHeader';
import { mockListHeaderProps } from './ListHeader.mocks';

export default {
  title: 'components/ListHeader',
  component: ListHeader,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ListHeader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ListHeader> = args => <ListHeader {...args} />;

export const LeftButton = Template.bind({});
export const RightButton = Template.bind({});
export const Loading = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

LeftButton.args = {
  ...mockListHeaderProps.left,
} as IListHeader;

RightButton.args = {
  ...mockListHeaderProps.right,
} as IListHeader;

Loading.args = {
  ...mockListHeaderProps.loading,
} as IListHeader;
