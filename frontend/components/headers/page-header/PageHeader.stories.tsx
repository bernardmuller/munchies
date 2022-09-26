import { ComponentMeta, ComponentStory } from '@storybook/react';
import PageHeader, { IPageHeader } from './PageHeader';
import { mockPageHeaderProps } from './PageHeader.mocks';

export default {
  title: 'components/PageHeader',
  component: PageHeader,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof PageHeader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PageHeader> = (args) => (
  <PageHeader {...args} />
);

export const LeftButton = Template.bind({});
export const RightButton = Template.bind({});
export const Loading = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

LeftButton.args = {
  ...mockPageHeaderProps.left,
} as IPageHeader;

RightButton.args = {
  ...mockPageHeaderProps.right,
} as IPageHeader;

Loading.args = {
  ...mockPageHeaderProps.loading,
} as IPageHeader;
