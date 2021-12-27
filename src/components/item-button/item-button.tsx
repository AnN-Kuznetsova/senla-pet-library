import * as React from "react";
import {Button} from "@mui/material";

import {ThemeMode} from "../../const";


export enum ItemButtonMode {
  CLOSE = `item-button--close`,
  DELETE = `item-button--delete`,
  MORE = `item-button--more`,
  ON_RIGHT = `item-button--on-right`,
  WARNING = `item-button--warning`,
}


interface PropsType {
  textValue?: string,
  className?: ItemButtonMode | `${ItemButtonMode} ${ItemButtonMode}`,
  isDisabled?: boolean,
  onClick: () => void,
}


export const ItemButton: React.FC<PropsType> = (props: PropsType) => {
  const {
    textValue,
    className,
    isDisabled,
    onClick,
  } = props;

  let buttonColor = ThemeMode.INFO;

  if (className) {
    switch (true) {
      case className.includes(ItemButtonMode.CLOSE):
      case className.includes(ItemButtonMode.DELETE):
        buttonColor = ThemeMode.SECONDARY;
        break;
      case className.includes(ItemButtonMode.WARNING):
        buttonColor = ThemeMode.WARNING;
        break;
    }
  }

  return (
    <Button
      variant="outlined"
      className={`item-button ${className}`}
      color={buttonColor}
      disabled={isDisabled}
      onClick={onClick}
    >
      {textValue}
      <span className="item-button__inner"></span>
    </Button>
  );
};
