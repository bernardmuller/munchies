import { ComponentMeta, ComponentStory } from '@storybook/react';
import MealCard, { IMealCard } from './MealCard';
import { mockMealCardProps } from './MealCard.mocks';

export default {
  title: 'components/MealCard',
  component: MealCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof MealCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MealCard> = (args) => (
  <MealCard {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockMealCardProps.base,
} as IMealCard;
