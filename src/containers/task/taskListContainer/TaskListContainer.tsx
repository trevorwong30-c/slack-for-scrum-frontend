import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import TaskDetailModal from "../taskDetailModal/TaskDetailModal";
import {Task} from "../../../interfaces";
import {TaskStatus} from "../../../enums";
import {loadUserList} from "../../../redux/actions/loadUserList";

const TaskListContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  // const closeModal = () => {
  //   setIsModalVisible(false);
  // };

  const onModalClosed = () => {};

  useEffect(() => {
    dispatch(loadUserList());
    showModal();
  });

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
    commentsHistory: [
      {
        userId: 1,
        createdAt: new Date(),
        content: "How is the progress of this task?"
      },
      {
        userId: 2,
        createdAt: new Date(),
        content: "This task is currently on hold."
      },
      {
        userId: 3,
        createdAt: new Date(),
        content: "OK!"
      }
    ],
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
