import * as React from "react";
import {Button} from "@mui/material";


interface PropsType {
  textValue: string,
  onClick: () => void,
}


export const ItemButton: React.FC<PropsType> = (props: PropsType) => {
  const {
    textValue,
    onClick,
  } = props;

  return (
    <Button
      variant="outlined"
      className="item-button"
      color="secondary"
      onClick={onClick}
    >{textValue}</Button>
  );
};
