import { Task } from '../interfaces';

export const parseTasksReponse = (response: any): Task[] => {
  const tempArr: Task[] = [];

  console.log('before parseTasksReponse', response);

  response.forEach((item: any) => {
    let task: Task = {
      id: item?.iTask_id,
      reqId: item?.iReq_id,
      title: item?.sTitle,
      description: item?.sDescription,
      estimatedHour:item?.iEstimated_hour,
      remainingHour:item?.iRemaining_hour,
      historicalSpent: item.jHistorical_Spent ? JSON.parse(item.jHistorical_Spent) : {"hrs":[]},
      status:item?.iStatus,
      assigneeId:item?.iAssignee,
      commentsHistory: item.jComments_history ? JSON.parse(item.jComments_history) : [],
      createdAt: item?.dCreateAt,
      endAt: item?.dEndAt,
      lastUpdateAt: item?.dLastUpdateAt
    };
    tempArr.push(task);
  });

  console.log(tempArr);

  return tempArr;
};
