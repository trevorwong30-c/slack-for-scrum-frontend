import React, {useEffect, useState} from 'react';

import {DragDropContext} from 'react-beautiful-dnd';
import TaskColumn from '../taskColumn/TaskColumn';

import TaskBlock from "../taskBlock/TaskBlock";

import './scrumBoard.css';
import TaskDetailModal from "../../task/taskDetailModal/TaskDetailModal";
import {Task, RootState} from "../../../interfaces";
import {TaskStatus} from "../../../enums";
import moment from "moment";
import {loadUserList} from "../../../redux/actions/loadUserList";
import {useDispatch, useSelector} from "react-redux";
import SplitRequirementContainer from 'containers/requirement/splitRequirementContainer/SplitRequirementContainer';
import { loadAllTasks } from "../../../redux/actions/loadAllTasks";

function ScrumBoard(props: any) {

    const [isTaskDetailModalVisible, setIsTaskDetailModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

    const taskState = useSelector((state:RootState) => state.task);

    const dispatch = useDispatch();

    const [taskColumnList] = useState([
        {columnId: 'todoColumn', columnTitle: 'Todo', StatusId: TaskStatus.ToDo},
        {columnId: 'inProgressColumn', columnTitle: 'In Progress', StatusId: TaskStatus.InProgress},
        {columnId: 'doneColumn', columnTitle: 'Done', StatusId: TaskStatus.Done}
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
    }, []);

  const onDragEnd = () => {
    console.log('tester');
  };

  const getRequirementList = () =>{

  }

  console.log("taskList", taskList);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className="requirementColumnContainer">
            <SplitRequirementContainer/>
        </div>
        <div className="scrumBoard">
            {taskColumnList.map((taskColumn, index) => (
                <TaskColumn
                    key={taskColumn.columnId}
                    taskColumn={taskColumn}
                    columnType={"scrumBoard"}
                >
                    {taskList.map((task, index)=>{
                        if(taskColumn.StatusId === task.status){
                            return (
                                <TaskBlock
                                    key={`${taskColumn.columnId}-Task-${index}`}
                                    columnName={taskColumn.columnId}
                                    index={index}
                                >
                                    <div className="task-detail-modal-trigger" onClick={() => showTaskDetailModal(task)}>#{task.id} {task.title}</div>
                                </TaskBlock>
                            )
                        }
                    })}
                </TaskColumn>
            ))}
        </div>
        <TaskDetailModal task={selectedTask} show={isTaskDetailModalVisible} onHide={onTaskDetailModalClosed} />
    </DragDropContext>
  );
}

export default ScrumBoard;
