import React from 'react';
import { Draggable } from "react-beautiful-dnd";

import "./TaskBlock.css"

function TaskBlock(props:any) {
    return (
        <Draggable draggableId={`${props.columnName}-${props.index}`} index={props.index}>
			{(provided, snapshot) => (
				<div
					className={`taskBlockContainer`}
					ref={provided.innerRef}
					{...provided.draggableProps}>
					<div
						className={`taskBlock ${
							snapshot.isDragging ? "isDragging" : ""
						}`} 
						>
                        <div 
                        className="burger"
                        {...provided.dragHandleProps}
                        >
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div>
                            Test task
                        </div>
					</div>
				</div>
			)}
		</Draggable>
    );
}

export default TaskBlock;