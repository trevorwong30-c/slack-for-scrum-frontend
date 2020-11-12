import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Task } from '../../../interfaces';
import { Col, Form, Card, Button } from 'react-bootstrap';
import './style.scss';
import { TaskStatus } from '../../../enums';
import moment from 'moment';
import { updateTaskDetail } from '../../../redux/actions/updateTaskDetail';
import {postComment} from "../../../redux/actions/postComment";

const DATE_FORMAT = 'YYYY-MM-DD';

const TaskDetailModal = (props: TaskDetailModalProps) => {
  const { className, show, onHide, task } = props;

  const [formData, setFormData] = useState(task);

  const [inputComment, setInputComment] = useState<string>("");

  const { userMap } = useSelector((state: RootStateOrAny) => state.user);

  const dispatch = useDispatch();

  const onAssigneeChanged = (e: any) => {
    setFormData({
      ...formData,
      assigneeId: Number(e.target.value)
    });
  };

  const onStatusChanged = (e: any) => {
    setFormData({
      ...formData,
      status: Number(e.target.value) as TaskStatus
    });
  };

  const onDescriptionChanged = (e: any) => {
    setFormData({
      ...formData,
      description: e.target.value
    });
  };

  const onEstimatedHoursChanged = (e: any) => {
    setFormData({
      ...formData,
      estimatedHour: e.target.value
    });
  }

  const onCommentChanged = (e: any) => {
    setInputComment(e.target.value);
  }

  const submitComment = () => {
    dispatch(postComment(Number(task?.id), inputComment));
  }

  const saveTask = () => {
    dispatch(updateTaskDetail());
  };

  const renderAssigneeField = () => {
    return (
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Assignee</Form.Label>
        <Form.Control
          as="select"
          defaultValue={0}
          value={formData?.assigneeId}
          onChange={onAssigneeChanged}
        >
          <option value={0}>Not Assigned</option>
          {Object.keys(userMap).map((userId) => {
            const user = userMap[userId];
            return <option value={user.id}>{user.username}</option>;
          })}
        </Form.Control>
      </Form.Group>
    );
  };

  const renderCreatedAtLabel = () => {
    return (
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Created At</Form.Label>
        <Form.Control
          plaintext
          readOnly
          defaultValue={moment(task?.createdAt).format(DATE_FORMAT)}
        />
      </Form.Group>
    );
  };

  const renderEstimatedHoursField = () => {
    return (
        <Form.Row>
          <Col xs={6}>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Estimated No. of Hours</Form.Label>
              <Form.Control
                  type="number"
                  value={formData ? formData.estimatedHour : 0}
                  onChange={onEstimatedHoursChanged}
              >
              </Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>
    );
  }

  const renderStatusField = () => {

    return (
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          defaultValue={TaskStatus.NotSpecified}
          value={formData?.status as TaskStatus}
          onChange={onStatusChanged}
        >
          <option value={TaskStatus.NotSpecified}>Not Specified</option>
          <option value={TaskStatus.ToDo}>To Do</option>
          <option value={TaskStatus.InProgress}>In Progress</option>
          <option value={TaskStatus.Done}>Done</option>
        </Form.Control>
      </Form.Group>
    );
  };

  const renderStatusRow = () => {
    return (
      <Form.Row>
        <Col xs={4}>{renderAssigneeField()}</Col>
        <Col xs={4}>{renderStatusField()}</Col>
        <Col xs={4}>{renderCreatedAtLabel()}</Col>
      </Form.Row>
    );
  };

  const renderDescriptionField = () => {
    return (
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Description</Form.Label>
        <Form.Control
          className="description-textarea"
          as="textarea"
          value={formData?.description}
          rows={4}
          onChange={onDescriptionChanged}
        ></Form.Control>
      </Form.Group>
    );
  };

  const renderCommentArea = () => {
    if (!task?.commentsHistory || task?.commentsHistory.length <= 0) {
      return;
    }

    let commentDiv: Array<any> = [];

    for (let comment of task?.commentsHistory) {
      commentDiv.push(
        <Card>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              <Form.Row>
                <Col className="label-username" xs={6}>
                  {userMap[comment.userId]
                    ? userMap[comment.userId].username
                    : 'Unknown User'}
                </Col>
                <Col className="label-comment-date" xs={6}>
                  {moment(comment.createdAt).format(DATE_FORMAT)}
                </Col>
              </Form.Row>
            </Card.Subtitle>
            <Card.Text>{comment.content}</Card.Text>
          </Card.Body>
        </Card>
      );
    }

    return <div className="comment-area">{commentDiv}</div>;
  };

  const renderCommentField = () => {
    return (
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Comments</Form.Label>
        {renderCommentArea()}
        <div className="comment-input-wrapper">
          <Form.Control
              as="textarea"
              value={inputComment}
              rows={4}
              placeholder={'Type your comment here...'}
              onChange={onCommentChanged}
          >
          </Form.Control>
          <Button className={`button-submit-comment ${inputComment.trim() === "" ? "empty" : ""}`} variant="secondary" size="sm" onClick={submitComment}>Send!</Button>
        </div>
      </Form.Group>
    );
  };

  const renderFormButtons = () => {
    return (
      <Col className="form-buttons">
        <Button variant="success" onClick={saveTask}>
          Save Task
        </Button>{' '}
      </Col>
    );
  };

  useEffect(() => {
    setFormData(task);
  }, [show]);

  return (
    <Modal
      className={`TaskDetailModal ${className}`}
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          #{task?.id} {task?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {renderStatusRow()}
          {renderEstimatedHoursField()}
          {renderDescriptionField()}
          {renderCommentField()}
          {renderFormButtons()}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

interface TaskDetailModalProps {
  className?: string;
  show?: boolean;
  onHide?: Function;
  task?: Task;
}

export default TaskDetailModal;
