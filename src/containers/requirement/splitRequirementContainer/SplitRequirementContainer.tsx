import React, { useEffect, useState } from 'react';
import { Button, Accordion, Card, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { loadRequirementList } from '../../../redux/actions/loadRequirementList';
import { Requirement } from '../../../interfaces';
import CreateNewTaskModal from '../../../components/requirement/createNewTaskModal/createNewTaskModal';

const SplitRequirementContainer = () => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const requirements: Requirement[] = useSelector(
    (state: RootStateOrAny) => state.requirement.requirements
  );
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [
    addTaskRequirement,
    setAddTaskRequirement
  ] = useState<Requirement | null>(null);

  useEffect(() => {
    dispatch(loadRequirementList());
  }, [dispatch]);

  const handleAddTaskButtonPressed = (requirement: Requirement) => {
    setShowAddTaskModal(true);
    setAddTaskRequirement(requirement);
  };

  const getRequirementAccordion = (requirement: Requirement, index: number) => {
    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle
            as={Button}
            variant="link"
            eventKey={index.toString()}
          >
            {requirement.title}
          </Accordion.Toggle>
          <Button
            style={{ position: 'absolute', right: 16 }}
            variant="secondary"
            onClick={() => handleAddTaskButtonPressed(requirement)}
          >
            +
          </Button>
        </Card.Header>
        <Accordion.Collapse eventKey={index.toString()}>
          <Card.Body>
            <p>No tasks have been created for this requirement yet</p>
            <Button
              variant="primary"
              onClick={() => handleAddTaskButtonPressed(requirement)}
            >
              Add a New Task
            </Button>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  };

  const handleCloseModal = () => {
    setShowAddTaskModal(false);
  };

  return (
    <div className="SplitRequirementContainer">
      <Accordion style={{ width: '50%' }}>
        {requirements.map((requirement: Requirement, index: number) =>
          getRequirementAccordion(requirement, index)
        )}
      </Accordion>
      <CreateNewTaskModal
        onClose={handleCloseModal}
        isVisible={showAddTaskModal}
        requirement={addTaskRequirement}
      />
    </div>
  );
};

export default SplitRequirementContainer;
