import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Comment, Task, User } from '../../../interfaces';
import { Col, Form, Card, Button } from 'react-bootstrap';
import './style.scss';
import { TaskStatus } from '../../../enums';
import moment from 'moment';
import { updateTaskDetail } from '../../../redux/actions/updateTaskDetail';
import { postComment } from '../../../redux/actions/postComment';

const DATE_FORMAT = 'YYYY-MM-DD';

const TaskDetailModal = (props: TaskDetailModalProps) => {
  const { className, show, onHide, task } = props;

  const [taskAssigneeId, setTaskAssigneeId] = useState(0);

  const [taskStatus, setTaskStatus] = useState(TaskStatus.NotSpecified);

  const [taskEstimatedHour, setTaskEstimatedHour] = useState(0);

  const [taskDescription, setTaskDescription] = useState('');

  const [taskComments, setTaskComments] = useState<Array<Comment>>([]);

  const [taskHistoricalSpent, setTaskHistoricalSpent] = useState<Array<number>>(
    []
  );

  const [logTime, setLogTime] = useState(0);

  const [inputComment, setInputComment] = useState<string>('');

  const { userMap } = useSelector((state: RootStateOrAny) => state.user);

  const dispatch = useDispatch();

  const onAssigneeChanged = (e: any) => {
    setTaskAssigneeId(Number(e.target.value));
  };

  const onStatusChanged = (e: any) => {
    setTaskStatus(Number(e.target.value) as TaskStatus);
  };

  const onDescriptionChanged = (e: any) => {
    setTaskDescription(e.target.value);
  };

  const onEstimatedHoursChanged = (e: any) => {
    setTaskEstimatedHour(Number(e.target.value));
  };

  const onLogTimeChanged = (e: any) => {
    setLogTime(Number(e.target.value));
  };

  const onCommentChanged = (e: any) => {
    setInputComment(e.target.value);
  };

  const submitComment = () => {
    if (!task) {
      return;
    }

    let formData: Task = JSON.parse(JSON.stringify(task));

    formData.commentsHistory = formData.commentsHistory
      ? formData.commentsHistory
      : [];

    formData.commentsHistory.push({
      userId: 1,
      content: inputComment,
      createdAt: new Date()
    });

    setTaskComments(formData.commentsHistory);
    setInputComment('');

    dispatch(updateTaskDetail(formData));
  };

  const saveTask = () => {
    if (!task) {
      return;
    }

    let formData: Task = JSON.parse(JSON.stringify(task));

    formData.assigneeId = taskAssigneeId;
    formData.description = taskDescription;
    formData.status = taskStatus;
    formData.estimatedHour = taskEstimatedHour;

    if (logTime > 0) {
      formData.historicalSpent.hrs.push(logTime);
      setLogTime(0);
      setTaskHistoricalSpent(formData.historicalSpent.hrs);
    }

    dispatch(updateTaskDetail(formData));
  };

  const renderAssigneeField = () => {
    return (
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Assignee</Form.Label>
        <Form.Control
          as="select"
          defaultValue={0}
          value={taskAssigneeId}
          onChange={onAssigneeChanged}
        >
          <option value={0}>Not Assigned</option>
          {Object.keys(userMap).map((userId) => {
            const user: User = userMap[userId];
            if (user.isProjectUser) {
              return <option value={user.id}>{user.username}</option>;
            }
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
              value={taskEstimatedHour}
              onChange={onEstimatedHoursChanged}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
    );
  };

  const renderSpentHoursField = () => {
    const hours =
      taskHistoricalSpent.length > 0
        ? taskHistoricalSpent.reduce((val: number, acc: number) => {
            return acc + val;
          })
        : 0;

    return (
      <Form.Row>
        <Col xs={6}>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Total Hours Spent</Form.Label>
            <Form.Control plaintext readOnly value={hours} />
          </Form.Group>
        </Col>
      </Form.Row>
    );
  };

  const renderLogTimeField = () => {
    return (
      <Form.Row>
        <Col xs={6}>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Log Time</Form.Label>
            <Form.Control
              type="number"
              value={logTime}
              onChange={onLogTimeChanged}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
    );
  };

  const renderStatusField = () => {
    return (
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          defaultValue={TaskStatus.NotSpecified}
          value={taskStatus as TaskStatus}
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
          value={taskDescription}
          rows={4}
          onChange={onDescriptionChanged}
        ></Form.Control>
      </Form.Group>
    );
  };

  const renderCommentArea = () => {
    let commentDiv: Array<any> = [];

    for (let comment of taskComments) {
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
          ></Form.Control>
          <Button
            className={`button-submit-comment ${
              inputComment.trim() === '' ? 'empty' : ''
            }`}
            variant="secondary"
            size="sm"
            onClick={submitComment}
          >
            Send!
          </Button>
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
    if (task && task.status) {
      setTaskStatus(task.status);
    }

    if (task && task.description) {
      setTaskDescription(task.description);
    }

    if (task && task.estimatedHour) {
      setTaskEstimatedHour(task.estimatedHour);
    }

    if (task && task.assigneeId) {
      setTaskAssigneeId(task.assigneeId);
    }

    if (task && task.commentsHistory) {
      setTaskComments(task.commentsHistory);
    }

    if (task && task.historicalSpent) {
      setTaskHistoricalSpent(task.historicalSpent.hrs);
    }
  }, [task]);

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
          {renderSpentHoursField()}
          {renderLogTimeField()}
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
