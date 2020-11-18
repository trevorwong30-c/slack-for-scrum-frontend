import React, { useState } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

interface CreateNewSprintModalProp {
  isVisible: boolean;
  onClose: () => void;
  onNewSprintCreated: (startDate: string, endDate: string) => void;
}

const CreateNewSprintModal = ({
  isVisible = false,
  onClose,
  onNewSprintCreated
}: CreateNewSprintModalProp) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleModalClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleCreateNewSprint = () => {
    if (onNewSprintCreated) {
      onNewSprintCreated(startDate, endDate);
    }
  };

  const onStartDateChanged = (e: any) => {
    console.log('start date changed to ', e.target.value);
    setStartDate(e.target.value);
  };
  const onEndDateChanged = (e: any) => {
    console.log('end date changed to ', e.target.value);
    setEndDate(e.target.value);
  };

  return (
    <Modal show={isVisible} className="CreateNewSprintModal">
      <Modal.Header>
        <h3>Create New Sprint</h3>
        <IconButton
          color="primary"
          onClick={handleModalClose}
          aria-label="close"
        >
          <CloseOutlinedIcon />
        </IconButton>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Form.Group as={Col}>
            <Form.Row>
              <Col>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="text"
                  value={startDate}
                  onChange={onStartDateChanged}
                  placeholder="yyyy-mm-dd"
                />
              </Col>
              <Col>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="text"
                  value={endDate}
                  onChange={onEndDateChanged}
                  placeholder="yyyy-mm-dd"
                />
              </Col>
            </Form.Row>
          </Form.Group>
        </div>
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
