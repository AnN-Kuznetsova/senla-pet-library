import * as React from "react";
import {shallow} from "enzyme";

import {ItemButton, ItemButtonMode} from "./item-button";


describe(`Render <ItemButton>`, () => {
  it(`Should render button with correct text and class`, () => {
    const itemButtonElement = shallow(
      <ItemButton
        textValue={`Item-Button`}
        className={ItemButtonMode.WARNING}
        onClick={()=>{/**/}}
      />);

    expect(itemButtonElement.text()).toBe(`Item-Button`);
    expect(itemButtonElement.hasClass(ItemButtonMode.WARNING));
  });

  it(`Should ItemButton be pressed`, () => {
    const onClick = jest.fn();

    const itemButtonElement = shallow(
      <ItemButton
        onClick={onClick}
      />);

    expect(onClick).toBeCalledTimes(0);

    itemButtonElement.simulate(`click`);
    expect(onClick).toBeCalledTimes(1);

    itemButtonElement.simulate(`click`);
    itemButtonElement.simulate(`click`);
    expect(onClick).toBeCalledTimes(3);
  });
});
