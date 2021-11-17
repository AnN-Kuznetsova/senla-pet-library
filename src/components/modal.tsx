import * as React from "react";
import * as ReactDOM from "react-dom";
import {useEffect} from "react";

import {ItemButton} from "./item-button";
import { Wait } from "./wait";


const modalElement = document.querySelector(`#modal`);

const openModal = () => {
  modalElement.classList.add(`modal--js-isShow`);
};

export const closeModal = () => {
  modalElement.classList.remove(`modal--js-isShow`);
};


interface PropsType {
  children: React.ReactElement,
  isOpen: boolean,
  onClose?: () => void,
}


export const Modal: React.FC<PropsType> = (props: PropsType) => {
  const {
    isOpen,
    onClose,
    children,
  } = props;

  const isCloseButton = (children.type === Wait) ? false : true;

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen]);

  const close = () => {
    onClose();
    closeModal();
  };

  const handleModalInnerClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const handleCloseButtonClick = () => {
    close();
  };

  const handleFormSubmit = (): void => {
    close();
  };

  return ReactDOM.createPortal(
    <section
      className="modal__wrapper"
      onClick={handleCloseButtonClick}
    >
      <div
        className="modal__inner"
        onClick={handleModalInnerClick}
        onSubmit={handleFormSubmit}
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
