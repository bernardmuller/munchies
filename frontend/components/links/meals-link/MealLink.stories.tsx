import { ComponentMeta, ComponentStory } from '@storybook/react';
import MealLink, { IMealLink } from './MealLink';
import { mockMealLinkTemplateProps } from './MealLink.mocks';

export default {
  title: 'components/MealLink',
  component: MealLink,
  argTypes: {},
} as ComponentMeta<typeof MealLink>;

const Template: ComponentStory<typeof MealLink> = (args) => (
  <MealLink {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockMealLinkTemplateProps.base,
} as IMealLink;
