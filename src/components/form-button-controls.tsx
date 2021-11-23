import * as React from "react";
import {Button} from "@mui/material";


export enum FormButtonControlsType {
  CHANGE = `CHANGE`,
  SAVE = `SAVE`,
  CANCEL = `CANCEL`,
}


export interface ControlButtonType {
  type: FormButtonControlsType,
  isDisabled?: boolean,
  isSubmit?: boolean,
  onClick?: () => void,
}

interface PropsType {
  buttons: ControlButtonType[],
}


export const FormButtonControls: React.FC<PropsType> = (props: PropsType) => {
  const {
    buttons,
  } = props;

  return (
    <div className="control-buttons ">
      {buttons.map((button, index) => {
        let label = ``;

        switch (button.type) {
          case FormButtonControlsType.CHANGE:
            label = `Change`;
            break;
          case FormButtonControlsType.SAVE:
            label = `Save`;
            break;
          case FormButtonControlsType.CANCEL:
            label = `Cancel`;
            break;
        }

        return (
          <Button
            key={button.type + index}
            variant="contained"
            disabled={button.isDisabled}
            type={`${button.isSubmit ? "submit" : "button"}`}
            onClick={button.onClick} // ? button.onClick : ()=>{}}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};
