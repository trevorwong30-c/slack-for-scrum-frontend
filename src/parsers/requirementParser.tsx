import { Requirement } from '../interfaces';

export const parseRequirementResponse = (response: any): Requirement[] => {
  const tempArr: Requirement[] = [];

  response.forEach((item: any) => {
    let req: Requirement = {
      id: item.iReq_ID,
      title: item.sTitle,
      description: item.sDescription,
      estimatedEffort: item.iEstimated_effort,
      createdAt: item.dCreateAt,
      dueAt: item.dDueAt
    };
    tempArr.push(req);
  });

  console.log(tempArr);

  return tempArr;
};
