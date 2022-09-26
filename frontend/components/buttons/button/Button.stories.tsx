import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button, { IButton } from './Button';
import { mockButtonProps } from './Button.mocks';

export default {
  title: 'components/Button',
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Disabled = Template.bind({});

Primary.args = {
  ...mockButtonProps.primary,
} as IButton;

Secondary.args = {
  ...mockButtonProps.secondary,
} as IButton;

Disabled.args = {
  ...mockButtonProps.disabled,
} as IButton;
