import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../assets/styles/style.scss";

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
  textValue: 'Item_Button',
  //onClick: () => console.log(`itemButton click`),
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Primary.args,
  textValue: 'Disabled Item_Button',
  isDisabled: true,
};

export const More = Template.bind({});
More.args = {
  className: `item-button--more`,
};
