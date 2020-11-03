import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import TaskBlock from "../taskBlock/TaskBlock";

import "./TaskColumn.css"

function TaskColumn(props:any) {
    
    return (
        <div className='columnContainer'>
			<div className='columnTitle'>{props.taskColumn.columnTitle}</div>

			<Droppable droppableId={props.taskColumn.columnId} type='Task' direction='vertical'>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						className={`columnContent ${
							snapshot.isDraggingOver ? "isDragging" : ""
						}`}
						{...provided.droppableProps}>
						{props.taskList.map((task:any, index:number) => (
							<TaskBlock
                                key={`${props.taskColumn.columnTitle}-Task-${index}`}
								columnName={props.taskColumn.columnId}
								task={task}
								index={index}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
    );
}

export default TaskColumn;