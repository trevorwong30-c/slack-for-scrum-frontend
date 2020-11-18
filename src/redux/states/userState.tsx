import {UserState} from "../../interfaces";

const createUserState = (): UserState => {
  return {
    userList: [],
    userMap: {},
    searchResults: [],
    isSearching: false,
    isLoadingUserList: false,
    error: '',
    confirmUserTimestamp: 0
  };
};

export default createUserState;
