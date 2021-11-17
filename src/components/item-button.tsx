import * as React from "react";
import {Button} from "@mui/material";


interface PropsType {
  textValue?: string,
  className?: string,
  onClick?: () => void,
}


export const ItemButton: React.FC<PropsType> = (props: PropsType) => {
  const {
    textValue,
    className,
    onClick,
  } = props;

  return (
    <Button
      variant="outlined"
      className={`item-button ${className}`}
      color="secondary"
      onClick={onClick}
    >
      {textValue}
      <span className="item-button__inner"></span>
    </Button>
  );
};
