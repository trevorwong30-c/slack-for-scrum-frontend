import {
  SEARCH_USER_BY_KEYWORD_FAIL,
  SEARCH_USER_BY_KEYWORD_START,
  SEARCH_USER_BY_KEYWORD_SUCCESS
} from "../actions/searchUserByKeyword";
import {User, UserState} from "../../interfaces";
import {LOAD_USER_LIST_FAIL, LOAD_USER_LIST_START, LOAD_USER_LIST_SUCCESS} from "../actions/loadUserList";

const initialState = {
  list: [],
  error: ''
};

const userReducer = (state:UserState | any = initialState, action: any) => {
  switch (action.type) {
    // TODO:: SEARCH_USER_BY_KEYWORD seems to have duplicated functions, maybe I should combine those two APIs together
    case SEARCH_USER_BY_KEYWORD_START:
      return {
        ...state,
        searchResults: [],
        error: '',
        isSearching: true
      };
    case SEARCH_USER_BY_KEYWORD_SUCCESS:
      return {
        ...state,
        searchResults: action.list,
        error: action.error,
        isSearching: false
      };
    case SEARCH_USER_BY_KEYWORD_FAIL:
      return {
        ...state,
        error: action.error,
        isSearching: false
      };
    case LOAD_USER_LIST_START:
      return {
        ...state,
        userList: [],
        userMap: {},
        error: '',
        isLoadingUserList: true
      };
    case LOAD_USER_LIST_SUCCESS:
      return {
        ...state,
        userList: action.list,
        userMap: mapUsersById(action.list),
        error: action.error,
        isLoadingUserList: false
      };
    case LOAD_USER_LIST_FAIL:
      return {
        ...state,
        error: action.error,
        isLoadingUserList: false
      };
    default:
      return state;
  }
};

const mapUsersById = (userList: Array<User>) => {
  if (!userList) {
    return {};
  }

  let userMap: Record<number, User> = {};

  for(let user of userList) {
    userMap[user.id] = user;
  }

  return userMap;

}

export default userReducer;
