import { User } from '../interfaces';

export const parseUsersResponse = (response: any): User[] => {
  const tempArr: User[] = [];

  response.forEach((rawUser: any) => {
    let user: User = {
        id: rawUser.id,
        username: rawUser.user_name,
        role: rawUser.role,
        isProjectUser: rawUser.isProjectUser
    };
    tempArr.push(user);
  });

  console.log(tempArr);

  return tempArr;
};
