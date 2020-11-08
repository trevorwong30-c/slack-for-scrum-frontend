import React, { useEffect, useState } from 'react';
import { Button, Accordion, Card, Modal, ListGroup } from 'react-bootstrap';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { loadRequirementList } from '../../../redux/actions/loadRequirementList';
import { Requirement } from '../../../interfaces';
import CreateNewTaskModal from '../../../components/requirement/createNewTaskModal/CreateNewTaskModal';
import { Task } from '../../../interfaces';
import TaskDetailModal from 'containers/task/taskDetailModal/TaskDetailModal';
import TaskColumn from 'containers/scrum/taskColumn/TaskColumn';
import TaskBlock from 'containers/scrum/taskBlock/TaskBlock';
import { DragDropContext } from 'react-beautiful-dnd';
import './styles.css';

interface RequirementWithTasks {
  requirementId: number;
  tasks: Task[];
}

const SplitRequirementContainer = () => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const requirements: Requirement[] = useSelector(
    (state: RootStateOrAny) => state.requirement.requirements
  );
  const [requirementWithTasks, setRequirementWithTasks] = useState<
    RequirementWithTasks[]
  >([]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [
    addTaskRequirement,
    setAddTaskRequirement
  ] = useState<Requirement | null>(null);

  useEffect(() => {
    dispatch(loadRequirementList());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTask) {
      setShowTaskDetailsModal(true);
    } else {
      setShowTaskDetailsModal(false);
    }
  }, [selectedTask]);

  const handleAddTaskButtonPressed = (requirement: Requirement) => {
    setShowAddTaskModal(true);
    setAddTaskRequirement(requirement);
  };

  const handleTaskClicked = (task: Task) => {
    setSelectedTask(task);
  };

  const handleTaskDetailsModalClosed = () => {
    setSelectedTask(undefined);
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
            {getTaskListWithRequirementId(requirement.id).length > 0
              ? displayTasks(requirement)
              : getNoExistingTaskLayout(requirement)}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  };

  const onDragEnd = () => {
    console.log('tester');
  };

  const displayTasks = (requirement: Requirement) => {
    let tasks = getTaskListWithRequirementId(requirement.id);
    console.log('wahahah');
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskColumn
          key={requirement.id}
          requirementColumn={requirement}
          columnType={'requirementColumn'}
        >
          {tasks.map((task: Task, index: number) => {
            return (
              <TaskBlock
                key={`${requirement.id}-Task-${index}`}
                columnName={requirement.id}
                index={index}
              >
                <div onClick={()=>handleTaskClicked(task)}>{task.title}</div>
              </TaskBlock>
            );
          })}
        </TaskColumn>
      </DragDropContext>
    );
  };

  const getTaskListWithRequirementId = (requirementId: number) => {
    let result = requirementWithTasks.find(
      (item: RequirementWithTasks) => item.requirementId == requirementId
    );
    return result ? result.tasks : [];
  };

  const getNoExistingTaskLayout = (requirement: Requirement) => {
    return (
      <>
        <p>No tasks have been created for this requirement yet</p>
        <Button
          variant="primary"
          onClick={() => handleAddTaskButtonPressed(requirement)}
        >
          Add a New Task
        </Button>
      </>
    );
  };

  const handleCloseModal = () => {
    setShowAddTaskModal(false);
  };

  const handleRequirementCreated = (requirementId: number, newTask: Task) => {
    let tempArr: RequirementWithTasks[] = [...requirementWithTasks];
    let resultIndex = tempArr.findIndex(
      (item: RequirementWithTasks) => item.requirementId == requirementId
    );

    if (resultIndex == -1) {
      tempArr.push({ requirementId: requirementId, tasks: [newTask] });
    } else {
      let newTaskArr = [...tempArr[resultIndex].tasks, newTask];
      tempArr[resultIndex] = { ...tempArr[resultIndex], tasks: newTaskArr };
    }

    setRequirementWithTasks(tempArr);
  };

  useEffect(() => {
    console.log('requirementWithTasks', requirementWithTasks);
  }, [requirementWithTasks]);

  return (
    <div className="splitRequirementContainer">
      <Accordion style={{ width: '50%' }}>
        {requirements.map((requirement: Requirement, index: number) =>
          getRequirementAccordion(requirement, index)
        )}
      </Accordion>
      <CreateNewTaskModal
        onClose={handleCloseModal}
        isVisible={showAddTaskModal}
        requirement={addTaskRequirement}
        onRequirementCreated={handleRequirementCreated}
      />
      <TaskDetailModal
        show={showTaskDetailsModal}
        task={selectedTask}
        onHide={handleTaskDetailsModalClosed}
      />
    </div>
  );
};

export default SplitRequirementContainer;
