import { API_URL, MOCK_ENABLED } from '../../env.json';
import axios from 'axios';
import {
  mockGetAllUsers
} from '../mockHelper';
import { API_END_POINTS } from '../../constants';
import { User } from 'interfaces';

//axios instance
const instance = axios.create({
  baseURL: API_URL,
  timeout: 20000
});

// enable or disable mock data
const mockEnabled = MOCK_ENABLED;

//****create a mock function in mockHelper to mock the response****

export const getAllUsers = async () => {
  //TODO use axios to call API
  try {
    mockGetAllUsers(instance, mockEnabled);

    const res = await instance.get(API_END_POINTS.GET_ALL_USERS);
    if (res) {
      return { success: true, payload: res.data };
    } else {
      return { success: false, message: 'cannot get tasks' };
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
};

export const updateUser = async (user: User) => {
  //TODO use axios to call API
  try {
    const res = await instance.put(API_END_POINTS.PUT_USER.replace(":userId", user.id.toString()), {
      updateUserInfo: {
        isProjectUser: user.isProjectUser ? 1 : 0
      }
    });
    if (res) {
      return { success: true, payload: res.data };
    } else {
      return { success: false, message: 'cannot get tasks' };
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
};
