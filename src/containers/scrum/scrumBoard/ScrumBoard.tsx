import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { getTasksWithSprintIdThunk } from '../../../redux/actions/getTasksWithSprintIdAction';
import { addTaskIdToSprintThunk } from '../../../redux/actions/addTaskIdToSprintAction';
import { getAllSprintsThunk } from '../../../redux/actions/getAllSprintsAction';
import { getTasksWithReqId } from '../../../redux/actions/getTasksWithReqId';
import { updateTaskDetail } from '../../../redux/actions/updateTaskDetail';
import { loadAllTasks } from '../../../redux/actions/loadAllTasks';
import { loadUserList } from '../../../redux/actions/loadUserList';
import { Task, RootState } from '../../../interfaces';
import { TaskStatus } from '../../../enums';

import SplitRequirementContainer from 'containers/requirement/splitRequirementContainer/SplitRequirementContainer';
import SprintSelector from '../../../components/sprint/sprintSelector/sprintSelector';
import TaskDetailModal from '../../task/taskDetailModal/TaskDetailModal';
import TaskColumn from '../taskColumn/TaskColumn';
import TaskBlock from '../taskBlock/TaskBlock';

import './scrumBoard.css';

function ScrumBoard(props: any) {
  const [taskList, setTaskList] = useState<Array<Task>>([]);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [isTaskDetailModalVisible, setIsTaskDetailModalVisible] = useState(
    false
  );
  const [taskColumnList] = useState([
    { columnId: 'todoColumn', columnTitle: 'Todo', StatusId: TaskStatus.ToDo },
    {
      columnId: 'inProgressColumn',
      columnTitle: 'In Progress',
      StatusId: TaskStatus.InProgress
    },
    { columnId: 'doneColumn', columnTitle: 'Done', StatusId: TaskStatus.Done }
  ]);
  const taskState = useSelector((state: RootState) => state.task);

  const selectedSprintId = useSelector(
    (state: RootStateOrAny) => state.updateSelectedSprint.selectedSprintId
  );

  const todoList = useSelector(
    (state: RootStateOrAny) => state.getTasksWithSprintId.taskIds
  );

  const dispatch = useDispatch();

  const showTaskDetailModal = (task: Task) => {
    if (task) {
      setSelectedTask(task);
      setIsTaskDetailModalVisible(true);
    }
  };

  // const closeModal = () => {
  //   setIsModalVisible(false);
  // };

  const onTaskDetailModalClosed = () => {
    setSelectedTask(undefined);
    setIsTaskDetailModalVisible(false);
  };

  const onDragEnd = async (result: any) => {
    let fromRequirement: boolean = false;
    const sourceColumn = result?.source?.droppableId;
    const destinationColumn = result?.destination?.droppableId;

    if (
      sourceColumn !== 'todoColumn' &&
      sourceColumn !== 'inProgressColumn' &&
      sourceColumn !== 'doneColumn'
    ) {
      fromRequirement = true;
    }

    if (sourceColumn === undefined || destinationColumn === undefined)
      return console.log('Warning - Drop source/destination undefined');
    if (sourceColumn === destinationColumn)
      return console.log('Warning - Re-order action not yet supported');
    if (
      destinationColumn !== 'todoColumn' &&
      destinationColumn !== 'inProgressColumn' &&
      destinationColumn !== 'doneColumn'
    ) {
      return console.log(
        'Warning - Drop to requirement action not yet supported'
      );
    }
    let newTaskList: Array<Task> = [...taskList];
    const draggableId: number = +result.draggableId.split('-')[2];
    let updateTask: Task | undefined = taskList.find(
      (task) => task.id === draggableId
    );

    if (destinationColumn == 'todoColumn') {
      updateTask = { ...updateTask, status: 1 };
    } else if (destinationColumn == 'inProgressColumn') {
      updateTask = { ...updateTask, status: 2 };
    } else if (destinationColumn == 'doneColumn') {
      updateTask = { ...updateTask, status: 3 };
    } else {
      return console.log('Warning: unknown target status');
    }
    let updateTaskIndex: number | undefined = taskState.taskList.findIndex(
      (task) => task.id === draggableId
    );
    newTaskList[updateTaskIndex] = updateTask;
    setTaskList(newTaskList);
    await dispatch(updateTaskDetail(updateTask));

    if (fromRequirement) {
      const requirementId: number = +sourceColumn.split('-')[1];
      await dispatch(addTaskIdToSprintThunk(selectedSprintId, draggableId));
      await dispatch(getTasksWithSprintIdThunk(selectedSprintId));
      await dispatch(getTasksWithReqId(requirementId));
    }
  };

  useEffect(() => {
    setTaskList(taskState.taskList);
  }, [taskState.taskList]);

  useEffect(() => {
    dispatch(getTasksWithSprintIdThunk(selectedSprintId));
  }, [selectedSprintId]);

  useEffect(() => {
    dispatch(loadUserList());
    dispatch(loadAllTasks());
    dispatch(getAllSprintsThunk());
  }, [dispatch]);

  const getRequirementList = () => {};

  return (
    <>
      <div className="titleContainer">
        <div className="titleLabel">Scrum Board</div>
        <div className="sprintSelector">
          <SprintSelector />
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="requirementColumnContainer">
          <SplitRequirementContainer />
        </div>

        <div className="scrumBoard">
          {taskColumnList.map((taskColumn, index) => (
            <TaskColumn
              key={taskColumn.columnId}
              taskColumn={taskColumn}
              columnType={'scrumBoard'}
            >
              {taskList
                .filter((task) => todoList.includes(task.id))
                .map((task, index) => {
                  if (taskColumn.StatusId === task.status) {
                    return (
                      <TaskBlock
                        key={`${taskColumn.columnId}-Task-${index}`}
                        columnName={taskColumn.columnId}
                        index={index}
                        task={task}
                      >
                        <div
                          className="task-detail-modal-trigger"
                          onClick={() => showTaskDetailModal(task)}
                        >
                          #{task.id} {task.title}
                        </div>
                      </TaskBlock>
                    );
                  }
                })}
            </TaskColumn>
          ))}
        </div>
        <TaskDetailModal
          task={selectedTask}
          show={isTaskDetailModalVisible}
          onHide={onTaskDetailModalClosed}
        />
      </DragDropContext>
    </>
  );
}

export default ScrumBoard;
