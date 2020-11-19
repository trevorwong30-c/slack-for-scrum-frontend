import React, { useEffect, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Sprint } from '../../../interfaces';
import { updateSelectedSprint } from '../../../redux/actions/updateSelectedSprintAction';
import CreateNewSprintModal from '../../../components/sprint/createNewSprintModal/createNewSprintModal';

const SprintSelector = () => {
  const dispatch = useDispatch();
  const sprints = useSelector(
    (state: RootStateOrAny) => state.getAllSprints.sprints
  );
  const selectedSprintId = useSelector(
    (state: RootStateOrAny) => state.updateSelectedSprint.selectedSprintId
  );
  const [showNewSprintModal, setShowNewSprintModal] = useState(false);

  const onSelectedSprintChanged = (e: any) => {
    console.log('onSelectedSprintChanged ', e.target.value);
    dispatch(updateSelectedSprint(e.target.value));
  };

  const openNewSprintModal = () => {
    setShowNewSprintModal(true);
  };

  const closeNewSprintModal = () => {
    setShowNewSprintModal(false);
  };

  const handleNewSprintCreated = () => {};

  useEffect(() => {
    console.log('selectedSprintId changed to ', selectedSprintId);
  }, [selectedSprintId]);

  return (
    <>
      <Form.Group as={Col} controlId="formGridState">
        <Form.Row>
          <Col>
            <Form.Control
              as="select"
              defaultValue={1}
              value={selectedSprintId}
              onChange={onSelectedSprintChanged}
            >
              {sprints?.map((sprint: Sprint) => {
                return <option value={sprint.id}>Sprint {sprint.id}</option>;
              })}
            </Form.Control>
          </Col>
          <Col>
            <Button variant="secondary" onClick={openNewSprintModal}>
              New Sprint
            </Button>
          </Col>
        </Form.Row>
      </Form.Group>

      <CreateNewSprintModal
        isVisible={showNewSprintModal}
        onClose={closeNewSprintModal}
        onNewSprintCreated={handleNewSprintCreated}
      />
    </>
  );
};

export default SprintSelector;
