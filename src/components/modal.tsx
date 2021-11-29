import * as React from "react";
import * as ReactDOM from "react-dom";

import {InfoType } from "./info";
import {ItemButton} from "./item-button";


interface PropsType {
  children: React.ReactElement,
  onClose?: () => void,
}


const modalElement: HTMLElement = document.querySelector(`#modal`);


export const Modal: React.FC<PropsType> = (props: PropsType) => {
  const {
    onClose,
    children,
  } = props;

  const isCloseButton = (children.props.type === InfoType.WAIT) ? false : true;

  const handleModalInnerClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const handleCloseButtonClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return modalElement && ReactDOM.createPortal(
    <section
      className="modal__wrapper"
      onClick={handleCloseButtonClick}
    >
      <div
        className="modal__inner"
        onClick={handleModalInnerClick}
      >
        {isCloseButton &&
          <ItemButton
            onClick={handleCloseButtonClick}
            className="item-button--close"
          />
        }
        {children}
      </div>
    </section>,
    modalElement
  );
};
