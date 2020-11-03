import React from 'react';
import { Droppable } from "react-beautiful-dnd";

import './RequirementColumn.css'

function RequirementColumn(props:any) {
    console.log('props: ',props);
    return (
        <div className="requirementColumn">
            <Droppable droppableId={props.requirementColumn.iReq_ID} type='Task' direction='vertical'>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}>
						{props.children}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
        </div>
    );
}

export default RequirementColumn;