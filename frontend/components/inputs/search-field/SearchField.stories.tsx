import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchField, { ISearchField } from './SearchField';
import { mockSearchFieldProps } from './SearchField.mocks';

export default {
  title: 'components/SearchField',
  component: SearchField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof SearchField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchField> = args => <SearchField {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockSearchFieldProps.base,
} as ISearchField;
