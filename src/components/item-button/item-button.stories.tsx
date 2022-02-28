import * as React from "react";
import styled from "@emotion/styled";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {action} from "@storybook/addon-actions";


import {ItemButton, ItemButtonMode} from "./item-button";

export default {
  title: "ItemButton",
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
  className: ItemButtonMode.MORE,
  onClick: action(`ItemButton--more clicked`),
};

export const Warning = Template.bind({});
Warning.args = {
  className: ItemButtonMode.WARNING,
  textValue: `Return`,
  onClick: action(`ItemButton--warning clicked`),
};

export const Delete = Template.bind({});
Delete.args = {
  className: ItemButtonMode.DELETE,
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
  className: ItemButtonMode.CLOSE,
  onClick: action(`ItemButton--close clicked`),
};

Close.decorators = [
  (Story: ComponentStory<React.FC>) => (
    <CloseButtonWrapper>
      <Story />
    </CloseButtonWrapper>
  ),
];
