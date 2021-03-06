import React, { useEffect, useState } from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { loadRequirementList } from '../../../redux/actions/loadRequirementList';
import { Requirement } from '../../../interfaces';
import { Task } from '../../../interfaces';
import TaskDetailModal from 'containers/task/taskDetailModal/TaskDetailModal';
import CreateNewTaskModal from '../../../components/requirement/createNewTaskModal/createNewTaskModal';
import TaskColumn from 'containers/scrum/taskColumn/TaskColumn';
import TaskBlock from 'containers/scrum/taskBlock/TaskBlock';
import { getTasksWithReqId } from '../../../redux/actions/getTasksWithReqId';
import { loadAllTasks } from '../../../redux/actions/loadAllTasks';
import {
  createNewTaskThunk,
  resetCreateNewTaskStatus
} from '../../../redux/actions/createNewTask';
import './styles.css';
import { ApiStatus, TaskStatus } from 'enums';

interface SplitRequirementContainerProps {
  onTaskMoved?: (task: Task) => void;
}

//TODO callback when task is landed on a column

const SplitRequirementContainer = ({
  onTaskMoved
}: SplitRequirementContainerProps) => {
  const dispatch = useDispatch();
  const requirements: Requirement[] = useSelector(
    (state: RootStateOrAny) => state.requirement.requirements
  );
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [
    addTaskRequirement,
    setAddTaskRequirement
  ] = useState<Requirement | null>(null);
  const tasksToDisplay: Task[] = useSelector(
    (state: RootStateOrAny) => state.tasksWithReqId.tasks
  );
  const createTaskApiStatus = useSelector(
    (state: RootStateOrAny) => state.createNewTask.apiStatus
  );

  useEffect(() => {
    dispatch(loadRequirementList());
  }, [dispatch]);

  useEffect(() => {
    if (addTaskRequirement?.id) {
      dispatch(getTasksWithReqId(addTaskRequirement.id));
    }
  }, [addTaskRequirement, dispatch]);

  useEffect(() => {
    if (selectedTask) {
      setShowTaskDetailsModal(true);
    } else {
      setShowTaskDetailsModal(false);
    }
  }, [selectedTask]);

  useEffect(() => {
    if (createTaskApiStatus == ApiStatus.Success) {
      if (addTaskRequirement?.id) {
        const addTaskRequirementId:number = addTaskRequirement?.id;
        async function updateTaskUpdate(addTaskRequirementId:number){
          await dispatch(getTasksWithReqId(addTaskRequirementId));
          await dispatch(resetCreateNewTaskStatus());
          await dispatch(loadAllTasks());
        }
        
        updateTaskUpdate(addTaskRequirementId);
      }
    }
  }, [createTaskApiStatus]);

  const handleAddTaskButtonPressed = (requirement: Requirement) => {
    setShowAddTaskModal(true);
    setAddTaskRequirement(requirement);
  };

  const handleRequirementToggled = (requirement: Requirement) => {
    setAddTaskRequirement(requirement);
  };

  const handleTaskClicked = (task: Task) => {
    setSelectedTask(task);
  };

  const handleTaskDetailsModalClosed = () => {
    setSelectedTask(undefined);
  };

  const hasTasksOfThisRequirement = (requirementId: number) => {
    const index = tasksToDisplay.findIndex(
      (task: Task) =>
        task.reqId === requirementId && task.status == TaskStatus.NotSpecified
    );
    //console.log('hasTasksOfThisRequirement index: ', index);
    return index !== -1;
  };

  const getRequirementAccordion = (requirement: Requirement, index: number) => {
    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle
            as={Button}
            variant="link"
            eventKey={index.toString()}
            onClick={() => handleRequirementToggled(requirement)}
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
            {tasksToDisplay && hasTasksOfThisRequirement(requirement.id)
              ? displayTasks(requirement)
              : getNoExistingTaskLayout(requirement)}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  };

  const displayTasks = (requirement: Requirement) => {
    return (
      <TaskColumn
        key={requirement.id}
        requirementColumn={requirement}
        columnType={'requirementColumn'}
        requirement={requirement}
      >
        {tasksToDisplay.map((task: Task, index: number) => {
          if (
            task.reqId == requirement.id &&
            task.status == TaskStatus.NotSpecified
          ) {
            return (
              <TaskBlock
                key={`${requirement.id}-Task-${index}`}
                columnName={requirement.id}
                index={index}
                task={task}
              >
                {/*TODO real task card object */}
                <div
                  className="task-detail-modal-trigger"
                  onClick={() => handleTaskClicked(task)}
                >
                  #{task.id} {task.title}
                </div>
              </TaskBlock>
            );
          }

          return <></>;
        })}
      </TaskColumn>
    );
  };

  const getNoExistingTaskLayout = (requirement: Requirement) => {
    return (
      <div className="noTaskContainer">
        <p>No tasks have been created for this requirement yet</p>
        <Button
          variant="primary"
          onClick={() => handleAddTaskButtonPressed(requirement)}
        >
          Add a New Task
        </Button>
      </div>
    );
  };

  const handleCloseModal = () => {
    setShowAddTaskModal(false);
  };

  const handleRequirementCreated = (requirementId: number, newTask: Task) => {
    //TODO
    //call api to create new Task
    console.log('handleRequirementCreated');
    console.log('newTask ', newTask);
    dispatch(createNewTaskThunk(requirementId, newTask));
  };

  const handleTaskUpdated = (task: Task) => {
    //TODO
    //call api to update existing Task
  };

  return (
    <div className="splitRequirementContainer">
      <div className="requirementTitle">
        Requirements
      </div>
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
