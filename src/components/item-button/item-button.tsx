import * as React from "react";
import {Button} from "@mui/material";
import { ThemeMode } from "../../const";


export enum ItemButtonMode {
  CLOSE = `item-button--close`,
  DELETE = `item-button--delete`,
  MORE = `item-button--more`,
  ON_RIGHT = `item-button--on-right`,
}


interface PropsType {
  textValue?: string,
  className?: string,
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

  const buttonColor = className === ItemButtonMode.MORE ? ThemeMode.INFO : ThemeMode.SECONDARY;

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
