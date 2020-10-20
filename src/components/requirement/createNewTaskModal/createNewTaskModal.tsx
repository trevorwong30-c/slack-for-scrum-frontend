import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Requirement, Task } from '../../../interfaces';
import IconButton from '@material-ui/core/IconButton';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

interface CreateNewTaskModalProp {
  isVisible: boolean;
  requirement: Requirement | null;
  onClose: () => void;
  onRequirementCreated: (requirementId: number, task: Task) => void;
}
const CreateNewTaskModal = ({
  isVisible,
  requirement,
  onClose,
  onRequirementCreated
}: CreateNewTaskModalProp) => {
  const [title, setTitle] = useState('');

  const createNewTask = () => {
    if (requirement) {
      let task: Task = { title: title };
      onRequirementCreated(requirement.id, task);
      onClose();
    }
  };

  const handleTitleChange = (event: any) => {
    console.log('title value: ', event.target.value);
    setTitle(event.target.value);
  };

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
            <Form.Control type="text" onChange={handleTitleChange} />
          </Form.Group>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={createNewTask}>
          Create New Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateNewTaskModal;
