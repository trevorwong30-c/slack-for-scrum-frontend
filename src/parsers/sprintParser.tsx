import { Sprint } from '../interfaces';

export const parseSprintsResponse = (response: any): Sprint[] => {
  const tempArr: Sprint[] = [];

  response.forEach((item: any) => {
    let req: Sprint = {
      id: item.Sprint_ID,
      estimatedHour: item.Estimated_hour,
      createdAt: item.Create_at,
      endAt: item.End_at,
      lastUpdateAt: item.Last_update_at
    };

    tempArr.push(req);
  });

  console.log(tempArr);

  return tempArr;
};
