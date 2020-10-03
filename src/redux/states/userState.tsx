import {UserState} from "../../interfaces";

const createUserState = (): UserState => {
  return {
    users: [],
    searchResults: [],
    isSearching: false,
    error: ''
  };
};

export default createUserState;
