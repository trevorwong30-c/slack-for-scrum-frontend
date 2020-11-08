import React, { useState } from 'react';

import { DragDropContext } from 'react-beautiful-dnd';
import TaskColumn from '../taskColumn/TaskColumn';

import TaskBlock from "../taskBlock/TaskBlock";

import './scrumBoard.css';
import SplitRequirementContainer from 'containers/requirement/splitRequirementContainer/SplitRequirementContainer';

function ScrumBoard(props: any) {

    const [taskColumnList] = useState([
        { columnId: 'todoColumn', columnTitle: 'Todo', StatusId: 1},
        { columnId: 'inProgressColumn', columnTitle: 'In Progress', StatusId: 2},
        { columnId: 'doneColumn', columnTitle: 'Done', StatusId: 3}
    ]);

    const [requirementList] = useState([
        {
            iReq_ID: 10000, 
            sTitle: "Requirement 00", 
            sDescription: "Requirement Description 00",
            iEstimated_effort: 100,
            dCreatedAt: "20201010",
            dDueAt: "20201010"
        },
        {
            iReq_ID: 10001, 
            sTitle: "Requirement 01", 
            sDescription: "Requirement Description 01",
            iEstimated_effort: 100,
            dCreatedAt: "20201010",
            dDueAt: "20201010"
        },
        {
            iReq_ID: 10002, 
            sTitle: "Requirement 02", 
            sDescription: "Requirement Description 02",
            iEstimated_effort: 100,
            
        },
    ]);

    const [taskList] = useState([
        {
            iTask_ID: 100, 
            iReq_ID: 10000, 
            sTitle: "Task 00",
            sDescription: "Task Description 00",
            iEstimated_hour: 100,
            iRemaining_hour: 100,
            jHistorical_Spent: {},
            iStatus:1,
            iAssignee:0,
            jComments_history:{},
            dCreatedAt: "20201010",
            dEndAt: "20201010"
        },
        {
            iTask_ID: 101, 
            iReq_ID: 10000, 
            sTitle: "Task 00",
            sDescription: "Task Description 00",
            iEstimated_hour: 100,
            iRemaining_hour: 100,
            jHistorical_Spent: {},
            iStatus:1,
            iAssignee:0,
            jComments_history:{},
            dCreatedAt: "20201010",
            dEndAt: "20201010"
        },
        {
            iTask_ID: 102, 
            iReq_ID: 10000, 
            sTitle: "Task 00",
            sDescription: "Task Description 00",
            iEstimated_hour: 100,
            iRemaining_hour: 100,
            jHistorical_Spent: {},
            iStatus:2,
            iAssignee:0,
            jComments_history:{},
            dCreatedAt: "20201010",
            dEndAt: "20201010"
        },
        {
            iTask_ID: 103, 
            iReq_ID: 10003, 
            sTitle: "Task 00",
            sDescription: "Task Description 00",
            iEstimated_hour: 100,
            iRemaining_hour: 100,
            jHistorical_Spent: {},
            iStatus:2,
            iAssignee:0,
            jComments_history:{},
            dCreatedAt: "20201010",
            dEndAt: "20201010"
        },
        {
            iTask_ID: 104, 
            iReq_ID: 10004, 
            sTitle: "Task 00",
            sDescription: "Task Description 00",
            iEstimated_hour: 100,
            iRemaining_hour: 100,
            jHistorical_Spent: {},
            iStatus:2,
            iAssignee:0,
            jComments_history:{},
            dCreatedAt: "20201010",
            dEndAt: "20201010"
        },
        {
            iTask_ID: 105, 
            iReq_ID: 10005, 
            sTitle: "Task 00",
            sDescription: "Task Description 00",
            iEstimated_hour: 100,
            iRemaining_hour: 100,
            jHistorical_Spent: {},
            iStatus:3,
            iAssignee:0,
            jComments_history:{},
            dCreatedAt: "20201010",
            dEndAt: "20201010"
        },
        {
            iTask_ID: 106, 
            iReq_ID: 10000, 
            sTitle: "Task 00",
            sDescription: "Task Description 00",
            iEstimated_hour: 100,
            iRemaining_hour: 100,
            jHistorical_Spent: {},
            iStatus:0,
            iAssignee:0,
            jComments_history:{},
            dCreatedAt: "20201010",
            dEndAt: "20201010"
        },
        {
            iTask_ID: 107, 
            iReq_ID: 10000, 
            sTitle: "Task 00",
            sDescription: "Task Description 00",
            iEstimated_hour: 100,
            iRemaining_hour: 100,
            jHistorical_Spent: {},
            iStatus:0,
            iAssignee:0,
            jComments_history:{},
            dCreatedAt: "20201010",
            dEndAt: "20201010"
        },
        {
            iTask_ID: 107, 
            iReq_ID: 10000, 
            sTitle: "Task 00",
            sDescription: "Task Description 00",
            iEstimated_hour: 100,
            iRemaining_hour: 100,
            jHistorical_Spent: {},
            iStatus:0,
            iAssignee:0,
            jComments_history:{},
            dCreatedAt: "20201010",
            dEndAt: "20201010"
        },
        {
            iTask_ID: 108, 
            iReq_ID: 10001, 
            sTitle: "Task 00",
            sDescription: "Task Description 00",
            iEstimated_hour: 100,
            iRemaining_hour: 100,
            jHistorical_Spent: {},
            iStatus:0,
            iAssignee:0,
            jComments_history:{},
            dCreatedAt: "20201010",
            dEndAt: "20201010"
        },
    ]);

  const onDragEnd = () => {
    console.log('tester');
  };

  const getRequirementList = () =>{

  }


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
                        if(taskColumn.StatusId === task.iStatus){
                            return (
                                <TaskBlock
                                    key={`${taskColumn.columnId}-Task-${index}`}
                                    columnName={taskColumn.columnId}
                                    index={index}
                                >
                                    {`Tester${index}`}
                                </TaskBlock>
                            )
                        }
                    })}
                </TaskColumn>
            ))}
        </div>
    </DragDropContext>
  );
}

export default ScrumBoard;
