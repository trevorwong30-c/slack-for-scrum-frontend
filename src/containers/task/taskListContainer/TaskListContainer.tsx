import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import TaskDetailModal from "../taskDetailModal/TaskDetailModal";
import {Task} from "../../../interfaces";
import {TaskStatus} from "../../../enums";

const TaskListContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const requirementState = useSelector(
    (state: RootStateOrAny) => state.requirement
  );

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onModalClosed = () => {};

  const confirmRequirementList = () => {
    // dispatch an API action here
  };

  const renderRequirementList = () => {
    let arr = [];

    if (requirementState.list) {
      for (let item of requirementState.list) {
        arr.push(<li>{item.sDescription}</li>);
      }

      return (
        <ul>
          <li>{arr}</li>
        </ul>
      );
    }
  };

  useEffect(() => {
    showModal();
  }, []);

  const task: Task = {
    id: 473,
    reqId: 12,
    title: "Develop Task Detail Modal",
    description: "Develop Task Detail Modal for the project.\nFeatures including log time, input estimated hours, change status, assign to group member and post comments.",
    estimatedHour: 8,
    remainingHour: 4,
    historicalSpent: 3,
    status: TaskStatus.ToDo,
    assigneeId: 2,
    commentsHistory: [],
    createdAt: new Date(),
    endAt: new Date()
  };

  return (
    <div className="TaskListContainer">
      <TaskDetailModal show={isModalVisible} onHide={onModalClosed} task={task} />
    </div>
  );
};

export default TaskListContainer;
