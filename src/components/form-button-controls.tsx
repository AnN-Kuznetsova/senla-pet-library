import * as React from "react";
import {Button} from "@mui/material";


export enum FormButtonControllsType {
  CHANGE,
  SAVE,
  CANCEL,
}


export interface ControllButtonType {
  type: FormButtonControllsType;
  isDisabled?: boolean;
  isSubmit?: boolean;
  onClick?: () => void;
}

interface PropsType {
  buttons: ControllButtonType[];
}


export const FormButtonControlls: React.FC<PropsType> = (props: PropsType): JSX.Element => {
  const {buttons} = props;

  return (
    <div className="controll-buttons">
      {buttons.map((button, index) => {
        let label = ``;

        switch (button.type) {
        case FormButtonControllsType.CHANGE:
          label = `Change`;
          break;
        case FormButtonControllsType.SAVE:
          label = `Save`;
          break;
        case FormButtonControllsType.CANCEL:
          label = `Cancel`;
          break;
        }

        return (
          <Button
            key={button.type + index}
            variant="contained"
            disabled={button.isDisabled}
            type={`${button.isSubmit ? "submit" : "button"}`}
            onClick={button.onClick}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};
