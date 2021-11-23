import * as React from "react";
import * as ReactDOM from "react-dom";

import {ItemButton} from "./item-button";
import {Wait} from "./wait";


interface PropsType {
  children: React.ReactElement,
  onClose?: () => void,
}


const modalElement = document.querySelector(`#modal`);


export const Modal: React.FC<PropsType> = (props: PropsType) => {
  const {
    onClose,
    children,
  } = props;

  const isCloseButton = (children.type === Wait) ? false : true;

  /* const close = React.useCallback(() => {
    onClose();
  }, [onClose]); */

  const handleModalInnerClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const handleCloseButtonClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
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
