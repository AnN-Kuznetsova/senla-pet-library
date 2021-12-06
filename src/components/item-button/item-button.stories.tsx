import * as React from "react";
import styled from "@emotion/styled";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { ItemButton } from "./item-button";


export default {
  title: 'ItemButton',
  component: ItemButton,
  argTypes: {
    //backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ItemButton>;


const Template: ComponentStory<typeof ItemButton> = (args) => <ItemButton {...args} />;


export const Default = Template.bind({});
Default.args = {
  textValue: `Ok`,
  onClick: action(`ItemButton clicked`),
};

export const Disabled = Template.bind({});
Disabled.args = {
  textValue: `Ok`,
  isDisabled: true,
};

export const More = Template.bind({});
More.args = {
  className: `item-button--more`,
  onClick: action(`ItemButton--more clicked`),
};

export const Delete = Template.bind({});
Delete.args = {
  className: `item-button--delete`,
  onClick: action(`ItemButton--delete clicked`),
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
  onClick: action(`ItemButton--close clicked`),
};

Close.decorators = [
  (Story: ComponentStory<React.FC>) => (
    <CloseButtonWrapper>
      <Story />
    </CloseButtonWrapper>
  ),
];
