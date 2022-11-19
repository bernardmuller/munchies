import { ComponentMeta, ComponentStory } from '@storybook/react';
import DetailHeader, { IDetailHeader } from './DetailHeader';
import { mockDetailHeaderProps } from './DetailHeader.mocks';

export default {
  title: 'components/header/DetailHeader',
  component: DetailHeader,
  argTypes: {},
} as ComponentMeta<typeof DetailHeader>;

const Template: ComponentStory<typeof DetailHeader> = args => <DetailHeader {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockDetailHeaderProps.base,
} as IDetailHeader;
