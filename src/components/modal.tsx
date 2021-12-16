import * as React from "react";
import * as ReactDOM from "react-dom";
import {useCallback, useState} from "react";

import {InfoType } from "./info";
import {ItemButton} from "./item-button/item-button";


interface PropsType {
  children: React.ReactElement,
  close: () => void,
}


const modalElement: HTMLElement = document.querySelector(`#modal`);


const Modal: React.FC<PropsType> = (props: PropsType) => {
  const {
    children,
    close,
  } = props;

  const isCloseButton = (children.props.type === InfoType.WAIT) ? false : true;

  const handleModalInnerClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const handleCloseButtonClick = () => {
    close();
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


const useModal = (onClose?: () => void) => {
  const [modalChildren, setModalChildren] = useState<JSX.Element>(<></>);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback((children: React.ReactElement<JSX.Element>) => {
    setModalChildren(children);
    setIsModalOpen(true);
  }, [setIsModalOpen, setModalChildren]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);

    if (onClose) {
      onClose();
    }
  }, [setIsModalOpen, onClose]);

  const renderModal = () => (
    <>
      {isModalOpen &&
        <Modal
          close={closeModal}
        >
          {modalChildren}
        </Modal>
      }
    </>
  );

  return {
    renderModal,
    openModal,
    closeModal,
  };
};


export {
  Modal,
  useModal,
}
