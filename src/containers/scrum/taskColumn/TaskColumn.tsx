import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import './TaskColumn.css';

function TaskColumn(props: any) {
  let containerClassName: string = 'requirementColumn';
  let droppableId: string = 'requirementColumn';

  if (props.columnType === 'scrumBoard') {
    containerClassName = 'columnContainer';
    droppableId = props.taskColumn.columnId;
  } else {
    containerClassName = 'requirementColumn';
    droppableId = `Requirement-${props.requirement.id}-column`;
  }

  return (
    <div className={containerClassName}>
      {props.columnType === 'scrumBoard' ? (
        <div className={`columnTitle ${props.taskColumn.columnId}`}>
          {props.taskColumn.columnTitle}
        </div>
      ) : (
        <></>
      )}
      <Droppable droppableId={droppableId} type="Task" direction="vertical">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={`columnContent ${props?.taskColumn?.columnId} ${
              snapshot.isDraggingOver ? 'isDragging' : ''
            }`}
            {...provided.droppableProps}
          >
            {props.children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TaskColumn;
