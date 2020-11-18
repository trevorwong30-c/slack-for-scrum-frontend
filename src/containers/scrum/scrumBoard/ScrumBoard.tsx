import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { DragDropContext } from 'react-beautiful-dnd';
import TaskColumn from '../taskColumn/TaskColumn';

import TaskBlock from '../taskBlock/TaskBlock';

import './scrumBoard.css';
import TaskDetailModal from '../../task/taskDetailModal/TaskDetailModal';
import { Task, RootState } from '../../../interfaces';
import { TaskStatus } from '../../../enums';
import { loadUserList } from '../../../redux/actions/loadUserList';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import SplitRequirementContainer from 'containers/requirement/splitRequirementContainer/SplitRequirementContainer';
import { loadAllTasks } from '../../../redux/actions/loadAllTasks';
import SprintSelector from '../../../components/sprint/sprintSelector/sprintSelector';
import { getAllSprintsThunk } from '../../../redux/actions/getAllSprintsAction';

function ScrumBoard(props: any) {
  const [isTaskDetailModalVisible, setIsTaskDetailModalVisible] = useState(
    false
  );
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  const taskState = useSelector((state: RootState) => state.task);

  const selectedSprintId = useSelector(
    (state: RootStateOrAny) => state.updateSelectedSprint.selectedSprintId
  );

  const dispatch = useDispatch();

  const [taskColumnList] = useState([
    { columnId: 'todoColumn', columnTitle: 'Todo', StatusId: TaskStatus.ToDo },
    {
      columnId: 'inProgressColumn',
      columnTitle: 'In Progress',
      StatusId: TaskStatus.InProgress
    },
    { columnId: 'doneColumn', columnTitle: 'Done', StatusId: TaskStatus.Done }
  ]);

  // const [requirementList] = useState([
  //     {
  //         iReq_ID: 10000,
  //         sTitle: "Requirement 00",
  //         sDescription: "Requirement Description 00",
  //         iEstimated_effort: 100,
  //         dCreatedAt: "20201010",
  //         dDueAt: "20201010"
  //     },
  //     {
  //         iReq_ID: 10001,
  //         sTitle: "Requirement 01",
  //         sDescription: "Requirement Description 01",
  //         iEstimated_effort: 100,
  //         dCreatedAt: "20201010",
  //         dDueAt: "20201010"
  //     },
  //     {
  //         iReq_ID: 10002,
  //         sTitle: "Requirement 02",
  //         sDescription: "Requirement Description 02",
  //         iEstimated_effort: 100,
  //     },
  // ]);

  // const [taskList] = useState<Array<Task>>([
  //     {
  //         id: 100,
  //         reqId: 10000,
  //         title: "Task 00",
  //         description: "Task Description 00",
  //         estimatedHour: 100,
  //         remainingHour: 100,
  //         historicalSpent: {},
  //         status: TaskStatus.InProgress,
  //         assigneeId: 0,
  //         commentsHistory: [],
  //         createdAt: moment("2020-10-10").toDate(),
  //         endAt: moment("2020-10-10").toDate()
  //     },
  //     {
  //         id: 101,
  //         reqId: 10000,
  //         title: "Task 01",
  //         description: "Task Description 01",
  //         estimatedHour: 100,
  //         remainingHour: 100,
  //         historicalSpent: {},
  //         status: TaskStatus.InProgress,
  //         assigneeId: 0,
  //         commentsHistory: [],
  //         createdAt: moment("2020-10-10").toDate(),
  //         endAt: moment("2020-10-10").toDate()
  //     },
  //     {
  //         id: 102,
  //         reqId: 10000,
  //         title: "Task 00",
  //         description: "Task Description 00",
  //         estimatedHour: 100,
  //         remainingHour: 100,
  //         historicalSpent: {},
  //         status: TaskStatus.Done,
  //         assigneeId: 0,
  //         commentsHistory: [],
  //         createdAt: moment("2020-10-10").toDate(),
  //         endAt: moment("2020-10-10").toDate()
  //     },
  //     {
  //         id: 103,
  //         reqId: 10003,
  //         title: "Task 00",
  //         description: "Task Description 00",
  //         estimatedHour: 100,
  //         remainingHour: 100,
  //         historicalSpent: {},
  //         status: TaskStatus.Done,
  //         assigneeId: 0,
  //         commentsHistory: [],
  //         createdAt: moment("2020-10-10").toDate(),
  //         endAt: moment("2020-10-10").toDate()
  //     },
  //     {
  //         id: 104,
  //         reqId: 10004,
  //         title: "Task 00",
  //         description: "Task Description 00",
  //         estimatedHour: 100,
  //         remainingHour: 100,
  //         historicalSpent: {},
  //         status: TaskStatus.Done,
  //         assigneeId: 2,
  //         commentsHistory: [],
  //         createdAt: moment("2020-10-10").toDate(),
  //         endAt: moment("2020-10-10").toDate()
  //     },
  //     {
  //         id: 105,
  //         reqId: 10005,
  //         title: "Task 00",
  //         description: "Task Description 00",
  //         estimatedHour: 100,
  //         remainingHour: 100,
  //         historicalSpent: {},
  //         status: 3,
  //         assigneeId: 0,
  //         commentsHistory: [],
  //         createdAt: moment("2020-10-10").toDate(),
  //         endAt: moment("2020-10-10").toDate()
  //     },
  //     {
  //         id: 106,
  //         reqId: 10000,
  //         title: "Task 00",
  //         description: "Task Description 00",
  //         estimatedHour: 100,
  //         remainingHour: 100,
  //         historicalSpent: {},
  //         status: TaskStatus.NotSpecified,
  //         assigneeId: 0,
  //         commentsHistory: [],
  //         createdAt: moment("2020-10-10").toDate(),
  //         endAt: moment("2020-10-10").toDate()
  //     },
  //     {
  //         id: 107,
  //         reqId: 10000,
  //         title: "Task 00",
  //         description: "Task Description 00",
  //         estimatedHour: 100,
  //         remainingHour: 100,
  //         historicalSpent: {},
  //         status: TaskStatus.NotSpecified,
  //         assigneeId: 0,
  //         commentsHistory: [],
  //         createdAt: moment("2020-10-10").toDate(),
  //         endAt: moment("2020-10-10").toDate()
  //     },
  //     {
  //         id: 107,
  //         reqId: 10000,
  //         title: "Task 00",
  //         description: "Task Description 00",
  //         estimatedHour: 100,
  //         remainingHour: 100,
  //         historicalSpent: {},
  //         status: TaskStatus.NotSpecified,
  //         assigneeId: 0,
  //         commentsHistory: [],
  //         createdAt: moment("2020-10-10").toDate(),
  //         endAt: moment("2020-10-10").toDate()
  //     },
  //     {
  //         id: 108,
  //         reqId: 10001,
  //         title: "Task 00",
  //         description: "Task Description 00",
  //         estimatedHour: 100,
  //         remainingHour: 100,
  //         historicalSpent: {},
  //         status: TaskStatus.NotSpecified,
  //         assigneeId: 0,
  //         commentsHistory: [],
  //         createdAt: moment("2020-10-10").toDate(),
  //         endAt: moment("2020-10-10").toDate()
  //     },
  // ]);

  const [taskList, setTaskList] = useState<Array<Task>>([]);

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

  useEffect(() => {
    setTaskList(taskState.taskList);
  }, [taskState.taskList]);

  useEffect(() => {
    dispatch(loadUserList());
    dispatch(loadAllTasks());
    dispatch(getAllSprintsThunk());
  }, [dispatch]);

  const onDragEnd = (result: any) => {
    console.log('result: ', result);
    const sourceColumn = result?.source?.droppableId;
    const destinationColumn = result?.destination?.droppableId;
    // console.log('result.source: ', sourceColumn);
    // console.log('result.destination: ', destinationColumn);
    if (sourceColumn === destinationColumn) console.log('Re-order action');
    if (
      destinationColumn !== 'todoColumn' &&
      destinationColumn !== 'inProgressColumn' &&
      destinationColumn !== 'doneColumn'
    ) {
      return console.log('Warning - Drop to requirement');
    }
    const draggable: string = result.draggableId;
    const draggableId: number = +draggable.split('-')[2];
    let updateTask: Task | undefined = taskState.taskList.find(
      (task) => task.id === draggableId
    );

    console.log('selectedSprintId: ', selectedSprintId);
    console.log('draggableId: ', draggableId);
    console.log('updateTask: ', updateTask);
    if (
      sourceColumn !== 'todoColumn' &&
      sourceColumn !== 'inProgressColumn' &&
      sourceColumn !== 'doneColumn'
    ) {
      /*============================================*/
      //Add task id to sprint
      /*============================================*/
      /*============================================*/
      //Add task id to sprint
      /*============================================*/
      dispatch(loadAllTasks());
    }
    if (destinationColumn == 'todoColumn') {
      updateTask = { ...updateTask, status: 1 };
      /*============================================*/
      // Edit status to
      /*============================================*/
    }
    else if (destinationColumn == 'inProgressColumn') {
      updateTask = { ...updateTask, status: 2 };
      /*============================================*/
      // Edit status to
      /*============================================*/
    }
    else if (destinationColumn == 'doneColumn') {
      updateTask = { ...updateTask, status: 3 };
      /*============================================*/
      // Edit status to
      /*============================================*/
    }
    else{
      return console.log('Warning: unknown target status');
    }
    console.log('new updateTask: ',updateTask);
  };
  const getRequirementList = () => {};

  console.log('taskList', taskList);

  return (
    <>
      <div className="titleContainer">
        <div className="titleLabel">
          Scrum Board
        </div>
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
              {taskList.map((task, index) => {
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
