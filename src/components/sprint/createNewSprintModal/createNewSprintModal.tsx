import React from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

interface CreateNewSprintModalProp {
  isVisible: boolean;
  onClose: () => void;
  onNewSprintCreated: () => void;
}

const CreateNewSprintModal = ({
  isVisible = false,
  onClose,
  onNewSprintCreated
}: CreateNewSprintModalProp) => {
  const handleModalClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleCreateNewSprint = () => {};

  return (
    <Modal show={isVisible} className="CreateNewSprintModal">
      <Modal.Header>
        Create New Sprint
        <IconButton color="primary" onClick={onClose} aria-label="close">
          <CloseOutlinedIcon />
        </IconButton>
      </Modal.Header>
      <Modal.Body>
        <div></div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCreateNewSprint}>
          Create New Sprint
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateNewSprintModal;
