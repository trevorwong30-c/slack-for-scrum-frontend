import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Requirement } from '../../../interfaces';
import IconButton from '@material-ui/core/IconButton';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

interface CreateNewTaskModalProp {
  isVisible: boolean;
  requirement?: Requirement | null;
  onClose: () => void;
}
const CreateNewTaskModal = ({
  isVisible,
  requirement,
  onClose
}: CreateNewTaskModalProp) => {
  return (
    <Modal show={isVisible}>
      <Modal.Header>
        New Task for {requirement ? requirement.title : 'unknown requirement'}
        <IconButton color="primary" onClick={onClose} aria-label="close">
          <CloseOutlinedIcon />
        </IconButton>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Form.Group controlId="formTextTitle">
            <Form.Label>Task Title</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateNewTaskModal;
