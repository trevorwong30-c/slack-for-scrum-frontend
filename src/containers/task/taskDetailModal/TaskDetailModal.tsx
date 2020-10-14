import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import {Task} from "../../../interfaces";
import {Row, Col, Form} from "react-bootstrap";
import "./style.scss";
import {TaskStatus} from "../../../enums";
import moment from "moment";

const TaskDetailModal = (props: TaskDetailModalProps) => {

  const { className, show, onHide, task } = props;

  const dispatch = useDispatch();

  const renderAssigneeField = () => {
    return (
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Assignee</Form.Label>
          <Form.Control as="select" defaultValue={1}>
            <option value={1}>Trevor</option>
            <option value={2}>Kay</option>
            <option value={3}>Chris</option>
          </Form.Control>
        </Form.Group>
    );
  }

  const renderCreatedAtLabel = () => {
    return (
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Created At</Form.Label>
          <Form.Control plaintext readOnly defaultValue={ moment(task.createdAt).format("YYYY-MM-DD") } />
        </Form.Group>
    );
  }

  const renderStatusField = () => {
    return (
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Status</Form.Label>
          <Form.Control as="select" defaultValue={TaskStatus.ToDo}>
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
            <Col xs={4}>{ renderAssigneeField() }</Col>
            <Col xs={4}>{ renderStatusField() }</Col>
            <Col xs={4}>{ renderCreatedAtLabel() }</Col>
        </Form.Row>
    );
  }

  const renderDescriptionField = () => {
      return (
          <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" defaultValue={""} rows={4}></Form.Control>
          </Form.Group>
      );
  }

  useEffect(() => {

  }, []);

  return (
      <Modal className={`TaskDetailModal ${className}`} show={show} onHide={onHide}>
          <Modal.Header closeButton>
              <Modal.Title>#{ task.id } { task.title }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                { renderStatusRow() }
                { renderDescriptionField() }
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
