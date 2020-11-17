import { User } from '../interfaces';

export const parseUsersResponse = (response: any): User[] => {
  const tempArr: User[] = [];

  response.forEach((item: any) => {
    let user: User = {
      id: 0,
      username: '',
      role: 2
    };
    tempArr.push(user);
  });

  console.log(tempArr);

  return tempArr;
};
