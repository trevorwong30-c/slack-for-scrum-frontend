import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadRequirementList } from '../../../redux/actions/loadRequirementList';
import { ListGroup } from 'react-bootstrap';
import { Requirement } from 'interfaces';

const ConfirmRequirementContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const requirements: Requirement[] = useSelector(
    (state: RootStateOrAny) => state.requirement.requirements
  );

  const dispatch = useDispatch();

  const history = useHistory();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onModalClosed = () => {};

  const confirmRequirementList = () => {
    // dispatch an API action here
    history.push('/task');
  };

  const renderListItems = () => {
    if (!requirements) {
      return <div />;
    }

    return requirements.map((requirement: Requirement) => {
      return <ListGroup.Item>{requirement.description}</ListGroup.Item>;
    });
  };

  const onRequirementListChanged = () => {
    if (requirements.length > 0) {
      showModal();
    }
  };

  useEffect(() => {
    dispatch(loadRequirementList());
  }, [dispatch]);

  useEffect(onRequirementListChanged, [requirements]);

  return (
    <div className="ConfirmRequirementContainer">
      <Modal show={isModalVisible} onHide={onModalClosed}>
        <Modal.Header>
          <Modal.Title>Requirement List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>{renderListItems()}</ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={confirmRequirementList}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConfirmRequirementContainer;
