import { ComponentMeta, ComponentStory } from '@storybook/react';
import NavButton, { INavButton } from './NavButton';
import { mockNavButtonProps } from './NavButton.mocks';

export default {
  title: 'components/navbar/NavButton',
  component: NavButton,
  argTypes: {},
} as ComponentMeta<typeof NavButton>;

const Template: ComponentStory<typeof NavButton> = (args) => (
  <NavButton {...args} />
);

export const Active = Template.bind({});
export const Inactive = Template.bind({});

Active.args = {
  ...mockNavButtonProps.active,
} as INavButton;

Inactive.args = {
  ...mockNavButtonProps.inActive,
} as INavButton;
