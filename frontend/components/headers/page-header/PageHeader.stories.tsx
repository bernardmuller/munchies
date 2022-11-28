import { ComponentMeta, ComponentStory } from '@storybook/react';
import ListHeader, { IListHeader } from './PageHeader';
import { mockListHeaderProps } from './PageHeader.mocks';

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
