import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { Requirement, Task, User } from '../../../interfaces';
import IconButton from '@material-ui/core/IconButton';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import './style.scss';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { loadUserList } from '../../../redux/actions/loadUserList';

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
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState(0);
  const [estimatedHour, setEstimatedHour] = useState(0);
  const { userList } = useSelector((state: RootStateOrAny) => state.user);

  useEffect(() => {
    dispatch(loadUserList());
  }, [dispatch]);

  const createNewTask = () => {
    if (requirement) {
      let task: Task = { title, description, assigneeId, estimatedHour };
      onRequirementCreated(requirement.id, task);
      onClose();
    }
  };

  const onTitleChange = (e: any) => {
    console.log('title value: ', e.target.value);
    setTitle(e.target.value);
  };

  const onDescriptionChanged = (e: any) => {
    console.log('onDescriptionChanged: ', e.target.value);
    setDescription(e.target.value);
  };

  const onAssigneeChanged = (e: any) => {
    setAssigneeId(Number(e.target.value));
  };

  const onEstimatedHourChanged = (e: any) => {
    setEstimatedHour(Number(e.target.value));
  };

  const renderTitleField = () => {
    return (
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Task Title</Form.Label>
        <Form.Control type="text" onChange={onTitleChange} />
      </Form.Group>
    );
  };

  const renderDescriptionField = () => {
    return (
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Description</Form.Label>
        <Form.Control
          className="description-textarea"
          as="textarea"
          rows={4}
          onChange={onDescriptionChanged}
        ></Form.Control>
      </Form.Group>
    );
  };

  const renderOtherInfoRow = () => {
    return (
      <Form.Row>
        <Col xs={4}>{renderAssigneeField()}</Col>
        <Col xs={4}>{renderEstimatedHoursField()}</Col>
      </Form.Row>
    );
  };

  const renderAssigneeField = () => {
    return (
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Assignee</Form.Label>
        <Form.Control
          as="select"
          onChange={onAssigneeChanged}
          value={assigneeId}
        >
          <option value={0}>Not Assigned</option>
          {userList.map((user: User) => {
            if (user.isProjectUser) {
              return <option value={user.id}>{user.username}</option>;
            }
          })}
        </Form.Control>
      </Form.Group>
    );
  };

  const renderEstimatedHoursField = () => {
    return (
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Estimated No. of Hours</Form.Label>
        <Form.Control type="number" onChange={onEstimatedHourChanged} />
      </Form.Group>
    );
  };

  return (
    <Modal show={isVisible} className="CreateNewTaskModal">
      <Modal.Header>
        New Task for {requirement ? requirement.title : 'unknown requirement'}
        <IconButton color="primary" onClick={onClose} aria-label="close">
          <CloseOutlinedIcon />
        </IconButton>
      </Modal.Header>
      <Modal.Body>
        <div>
          {renderTitleField()}
          {renderDescriptionField()}
          {renderOtherInfoRow()}
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
