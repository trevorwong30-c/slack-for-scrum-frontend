import React from 'react';
import ScrumBoard from "./scrumBoard/ScrumBoard"

import "./scrumBoardContainer.css"

function ScrumBoardContainer(props:any) {
    return (
        <div className="scrumBoardPageContainer">
			<div className='scrumBoardTitle'>Scrum board</div>
            <div className="scrumBoardContainer">
                <ScrumBoard />
            </div>
		</div>
    );
}

export default ScrumBoardContainer;