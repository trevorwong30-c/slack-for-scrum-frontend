import React, { useState } from 'react';

import { DragDropContext } from 'react-beautiful-dnd';
import TaskColumn from '../taskColumn/TaskColumn';
import RequirementColumn from '../requirementColumn/RequirementColumn'

import TaskBlock from "../taskBlock/TaskBlock";

import './scrumBoard.css';

function ScrumBoard(props: any) {
    interface taskBlock {
        [key: string]: any;
        [index: number]: any;
    }

    /*===========================================================*/
    //dummy data
    const [taskColumnList] = useState([
        { columnId: 'todoColumn', columnTitle: 'Todo', StatusId: 1},
        { columnId: 'inProgressColumn', columnTitle: 'In Progress', StatusId: 2},
        { columnId: 'doneColumn', columnTitle: 'Done', StatusId: 3}
    ]);

    const [requirementColumnList] = useState([
        { columnId: 'requirement0', columnTitle: 'requirement0 Title' },
        { columnId: 'requirement1', columnTitle: 'requirement1 Title' },
        { columnId: 'requirement2', columnTitle: 'requirement2 Title' }
    ]);

    const [requirementTaskBlock] = useState<taskBlock>({
        requirement0: [
            { taskId: 10001, taskTitle: 'Task0' },
            { taskId: 10001, taskTitle: 'Task1' },
            { taskId: 10002, taskTitle: 'Task2' }
        ],
        requirement1: [
            { taskId: 10003, taskTitle: 'Task3' },
            { taskId: 10004, taskTitle: 'Task4' }
        ],
        requirement2: [
            { taskId: 10005, taskTitle: 'Task5' },
            { taskId: 10006, taskTitle: 'Task6' },
            { taskId: 10007, taskTitle: 'Task7' },
            { taskId: 10008, taskTitle: 'Task8' },
            { taskId: 10009, taskTitle: 'Task9' },
            { taskId: 10010, taskTitle: 'Task10' }
        ]
    });
    const [taskBlock] = useState<taskBlock>({
        todoColumn: [
            { taskId: 10001, taskTitle: 'Task0' },
            { taskId: 10001, taskTitle: 'Task1' },
            { taskId: 10002, taskTitle: 'Task2' }
        ],
        inProgressColumn: [
            { taskId: 10003, taskTitle: 'Task3' },
            { taskId: 10004, taskTitle: 'Task4' }
        ],
        doneColumn: [
            { taskId: 10005, taskTitle: 'Task5' },
            { taskId: 10006, taskTitle: 'Task6' },
            { taskId: 10007, taskTitle: 'Task7' },
            { taskId: 10008, taskTitle: 'Task8' },
            { taskId: 10009, taskTitle: 'Task9' },
            { taskId: 10010, taskTitle: 'Task10' }
        ]
    });

    /*===========================================================*/
    
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
    ]);

  const onDragEnd = () => {
    console.log('tester');
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className="requirementColumnContainer">
            {requirementList.map((requirementColumn, index) => (
            <RequirementColumn
                key={requirementColumn.iReq_ID}
                requirementColumn={requirementColumn}
            >
                {taskList.map((task, index)=>(
                    <TaskBlock
                        key={`${requirementColumn.iReq_ID}-Task-${index}`}
                        columnName={requirementColumn.iReq_ID}
                        index={index}
                    />
                ))}
                </RequirementColumn>
            ))}
        </div>
        <div className="scrumBoard">
            {taskColumnList.map((taskColumn, index) => (
            <TaskColumn
                key={taskColumn.columnId}
                taskColumn={taskColumn}
                taskList={taskBlock[taskColumn.columnId]}
            />
            ))}
        </div>
    </DragDropContext>
  );
}

export default ScrumBoard;
