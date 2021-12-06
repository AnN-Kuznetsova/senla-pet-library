import * as React from "react";
import styled from "@emotion/styled";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ItemButton } from '../components/item-button';


export default {
  title: 'ItemButton',
  component: ItemButton,
  argTypes: {
    //backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ItemButton>;


const Template: ComponentStory<typeof ItemButton> = (args) => <ItemButton {...args} />;


export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  textValue: 'Ok',
  //onClick: () => console.log(`itemButton click`),
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Primary.args,
  textValue: 'Ok',
  isDisabled: true,
};

export const More = Template.bind({});
More.args = {
  className: `item-button--more`,
};

export const Delete = Template.bind({});
Delete.args = {
  className: `item-button--delete`,
};


export const Close = Template.bind({});

const CloseButtonWrapper = styled.div`
  position: relative;
  top: -25px;
  width: 100px;
  height: 40px;
`;

Close.args = {
  className: `item-button--close`,
};

Close.decorators = [
  (Story: ComponentStory<React.FC>) => (
    <CloseButtonWrapper>
      <Story />
    </CloseButtonWrapper>
  ),
];
