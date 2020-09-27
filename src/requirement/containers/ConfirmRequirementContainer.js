import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {loadRequirementList} from "../actions/loadRequirementList";

const ConfirmRequirementContainer = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const requirementState = useSelector(state => state.requirement);

  const dispatch = useDispatch();

  const history = useHistory();

  const showModal = () => {
    setIsModalVisible(true);
  }
  //
  // const closeModal = () => {
  //   setIsModalVisible(false);
  // }

  const onModalClosed = () => {

  }

  const confirmRequirementList = () => {
    // dispatch an API action here
    history.push("/task");
  }

  const renderRequirementList = () => {

    let arr = [];

    if (requirementState.list) {
      for(let item of requirementState.list) {
        arr.push(
          <li>{ item.sDescription }</li>
        );
      }

      return (
        <ul>
          <li>{ arr }</li>
        </ul>
      );

    }
  }

  const onRequirementListChanged = () => {
    if (requirementState.list.length > 0) {
      showModal();
    }
  }

  useEffect(() => {
    dispatch(loadRequirementList());
  }, []);

  useEffect(onRequirementListChanged, [requirementState.list]);

  return (
    <div className="ConfirmRequirementContainer">
      <Modal show={isModalVisible} onHide={onModalClosed}>
        <Modal.Header closeButton>
          <Modal.Title>Requirement List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { renderRequirementList() }
        </Modal.Body>
        <Modal.Footer>
          {/*<Button variant="secondary" onClick={closeModal}>*/}
          {/*  Close*/}
          {/*</Button>*/}
          <Button variant="primary" onClick={confirmRequirementList}>
            Confirm Requirements
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

};

export default ConfirmRequirementContainer;
