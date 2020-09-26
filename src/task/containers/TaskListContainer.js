import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from 'react-redux';

const TaskListContainer = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const requirementState = useSelector(state => state.requirement);

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  }

  const closeModal = () => {
    setIsModalVisible(false);
  }

  const onModalClosed = () => {

  }

  const confirmRequirementList = () => {
    // dispatch an API action here
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

  useEffect(() => {
    showModal();
  }, []);

  return (
    <div className="TaskListContainer">
      <Modal show={isModalVisible} onHide={onModalClosed}>
        <Modal.Header closeButton>
          <Modal.Title>Task List</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
      </Modal>
    </div>
  );

};

export default TaskListContainer;
