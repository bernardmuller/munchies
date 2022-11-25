import { ComponentMeta, ComponentStory } from '@storybook/react';
import MainUtilityButton, { IMainUtilityButton } from './MainUtilityButton';
import { mockMainUtilityButtonProps } from './MainUtilityButton.mocks';

export default {
  title: 'components/MainUtilityButton',
  component: MainUtilityButton,
  argTypes: {},
} as ComponentMeta<typeof MainUtilityButton>;

const Template: ComponentStory<typeof MainUtilityButton> = args => <MainUtilityButton {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockMainUtilityButtonProps.utility,
} as IMainUtilityButton;
