import { ComponentMeta, ComponentStory } from '@storybook/react';
import ChipFilter, { IChipFilter } from './ChipFilter';
import { mockChipFilterProps } from './ChipFilter.mocks';

export default {
  title: 'components/ChipFilter',
  component: ChipFilter,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ChipFilter>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ChipFilter> = args => <ChipFilter {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockChipFilterProps.base,
} as IChipFilter;
