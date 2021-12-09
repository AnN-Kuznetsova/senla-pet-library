import * as React from "react";
import {Button} from "@mui/material";


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

  return (
    <Button
      variant="outlined"
      className={`item-button ${className}`}
      color="secondary"
      disabled={isDisabled}
      onClick={onClick}
    >
      {textValue}
      <span className="item-button__inner"></span>
    </Button>
  );
};
