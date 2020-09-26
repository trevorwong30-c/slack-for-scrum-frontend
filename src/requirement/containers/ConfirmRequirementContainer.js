import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useDispatch} from "react-redux";
import {loadRequirementList} from "../actions/loadRequirementList";

const ConfirmRequirementContainer = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  }

  const closeModal = () => {
    setIsModalVisible(false);
  }

  const onModalClosed = () => {

  }

  useEffect(() => {
    dispatch(loadRequirementList());
    showModal();
  }, []);

  return (
    <div className="ConfirmRequirementContainer">
      <Modal show={isModalVisible} onHide={onModalClosed}>
        <Modal.Header closeButton>
          <Modal.Title>Requirement List</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          {/*<Button variant="secondary" onClick={closeModal}>*/}
          {/*  Close*/}
          {/*</Button>*/}
          <Button variant="primary" onClick={closeModal}>
            Confirm Requirements
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

};

export default ConfirmRequirementContainer;