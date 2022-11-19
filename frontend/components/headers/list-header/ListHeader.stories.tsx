import { ComponentMeta, ComponentStory } from '@storybook/react';
import ListHeader, { IListHeader } from './ListHeader';
import { mockListHeaderProps } from './ListHeader.mocks';

export default {
  title: 'components/header/ListHeader',
  component: ListHeader,
  argTypes: {},
} as ComponentMeta<typeof ListHeader>;

const Template: ComponentStory<typeof ListHeader> = args => <ListHeader {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockListHeaderProps.base,
} as IListHeader;
