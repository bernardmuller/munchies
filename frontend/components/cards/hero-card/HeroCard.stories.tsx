import { ComponentMeta, ComponentStory } from '@storybook/react';
import HeroCard, { IHeroCard } from './HeroCard';
import { mockHeroCardProps } from './HeroCard.mocks';

export default {
  title: 'components/HeroCard',
  component: HeroCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof HeroCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HeroCard> = args => <HeroCard {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockHeroCardProps.base,
} as IHeroCard;
