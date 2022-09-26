import { ComponentMeta, ComponentStory } from '@storybook/react';
import UtilityButton, { IUtilityButton } from './UtilityButton';
import { mockUtilityButtonProps } from './UtilityButton.mocks';

export default {
  title: 'components/UtilityButton',
  component: UtilityButton,
  argTypes: {},
} as ComponentMeta<typeof UtilityButton>;

const Template: ComponentStory<typeof UtilityButton> = (args) => (
  <UtilityButton {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockUtilityButtonProps.utility,
} as IUtilityButton;
