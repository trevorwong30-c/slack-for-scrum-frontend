import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {Task} from "../../../interfaces";
import {Col, Form, Card, Button} from "react-bootstrap";
import "./style.scss";
import {TaskStatus} from "../../../enums";
import moment from "moment";
import {updateTaskDetail} from "../../../redux/actions/updateTaskDetail";

const DATE_FORMAT = "YYYY-MM-DD";

const TaskDetailModal = (props: TaskDetailModalProps) => {


    const {className, show, onHide, task} = props;

    const [formData, setFormData] = useState(task);

    const { userMap } = useSelector(
        (state: RootStateOrAny) => state.user
    );

    const dispatch = useDispatch();

    const onAssigneeChanged = (e: any) => {
        setFormData({
            ...formData,
            assigneeId: Number(e.target.value)
        })
    };

    const onStatusChanged = (e: any) => {
        setFormData({
            ...formData,
            status: Number(e.target.value) as TaskStatus
        })
    }

    const onDescriptionChanged = (e: any) => {
        setFormData({
            ...formData,
            description: e.target.value
        })
    }

    const saveTask = () => {
        dispatch(updateTaskDetail());
    }

    const renderAssigneeField = () => {
        return (
            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Assignee</Form.Label>
                <Form.Control as="select" defaultValue={formData.assigneeId} onChange={onAssigneeChanged}>
                    {
                        Object.keys(userMap).map((userId) => {
                            const user = userMap[userId];
                            return (
                                <option value={user.id}>{ user.username }</option>
                            );
                        })
                    }
                </Form.Control>
            </Form.Group>
        );
    }

    const renderCreatedAtLabel = () => {
        return (
            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Created At</Form.Label>
                <Form.Control plaintext readOnly defaultValue={moment(task.createdAt).format(DATE_FORMAT)}/>
            </Form.Group>
        );
    }

    const renderStatusField = () => {
        return (
            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" defaultValue={TaskStatus.ToDo} onChange={onStatusChanged}>
                    <option value={TaskStatus.ToDo}>To Do</option>
                    <option value={TaskStatus.InProgress}>In Progress</option>
                    <option value={TaskStatus.Done}>Done</option>
                </Form.Control>
            </Form.Group>
        );
    }


    const renderStatusRow = () => {
        return (
            <Form.Row>
                <Col xs={4}>{renderAssigneeField()}</Col>
                <Col xs={4}>{renderStatusField()}</Col>
                <Col xs={4}>{renderCreatedAtLabel()}</Col>
            </Form.Row>
        );
    }

    const renderDescriptionField = () => {
        return (
            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Description</Form.Label>
                <Form.Control className="description-textarea" as="textarea" defaultValue={formData.description} rows={4} onChange={onDescriptionChanged}></Form.Control>
            </Form.Group>
        );
    }

    const renderCommentArea = () => {

        if (!task.commentsHistory) {
            return;
        }

        let commentDiv: Array<any> = [];

        for (let comment of task.commentsHistory) {
            commentDiv.push(
                <Card>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            <Form.Row>
                                <Col className="label-username" xs={6}>{ userMap[comment.userId] ? userMap[comment.userId].username : "Unknown User" }</Col>
                                <Col className="label-comment-date"
                                     xs={6}>{moment(comment.createdAt).format(DATE_FORMAT)}</Col>
                            </Form.Row>
                        </Card.Subtitle>
                        <Card.Text>{comment.content}</Card.Text>
                    </Card.Body>
                </Card>
            );
        }

        return (
            <div className="comment-area">
                {commentDiv}
            </div>
        );
    }

    const renderCommentField = () => {
        return (
            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Comments</Form.Label>
                {renderCommentArea()}
                <Form.Control as="textarea" defaultValue={""} rows={4}
                              placeholder={"Type your comment here..."}></Form.Control>
            </Form.Group>
        );
    }

    const renderFormButtons = () => {
        return (
            <Col className="form-buttons">
                <Button variant="success" onClick={saveTask}>Save Task</Button>{' '}
            </Col>
        );
    }

    useEffect(() => {

    }, []);

    useEffect(() => {
        console.log(`formData Changed`, formData);
    }, [formData])

    return (
        <Modal className={`TaskDetailModal ${className}`} show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>#{task.id} {task.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {renderStatusRow()}
                    {renderDescriptionField()}
                    {renderCommentField()}
                    {renderFormButtons()}
                </Form>
            </Modal.Body>
        </Modal>
    );
};

interface TaskDetailModalProps {
    className?: string
    show?: boolean
    onHide?: Function
    task: Task
}


export default TaskDetailModal;
