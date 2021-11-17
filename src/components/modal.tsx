import * as React from "react";
import * as ReactDOM from "react-dom";
import {useEffect} from "react";

import {ItemButton} from "./item-button";


const modalElement = document.querySelector(`#modal`);

const openModal = () => {
  modalElement.classList.add(`modal--js-isShow`);
};

const closeModal = () => {
  modalElement.classList.remove(`modal--js-isShow`);
};


interface PropsType {
  children: React.ReactChild,
  isOpen: boolean,
  onClose?: () => void,
}


export const Modal: React.FC<PropsType> = (props: PropsType) => {
  const {
    isOpen,
    onClose,
    children
  } = props;

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen]);

  const handleCloseButtonClick = () => {
    onClose();
    closeModal();
  };

  return ReactDOM.createPortal(
    <React.Fragment>
      <ItemButton
        onClick={handleCloseButtonClick}
        className="item-button--close"
      />
      {children}
    </React.Fragment>,
    modalElement
  );
};
