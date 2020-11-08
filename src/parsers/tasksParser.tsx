import { Task } from '../interfaces';

export const parseTasksReponse = (response: any): Task[] => {
  const tempArr: Task[] = [];

  response.forEach((item: any) => {
    let task: Task = {
      id: item?.iTask_ID,
      reqId: item?.iReq_ID,
      title: item?.sTitle,
      description: item?.sDescription,
      estimatedHour:item?.iEstimated_effort,
      remainingHour:item?.iRemaining_hour,
      historicalSpent:item?.jHistorical_spent,
      status:item?.iStatus,
      assigneeId:item?.iAssignee,
      commentsHistory:item?.jComments_history,
      createdAt: item?.dCreateAt,
      endAt: item?.dEndAt
    };
    tempArr.push(task);
  });

  console.log(tempArr);

  return tempArr;
};
