import {
  SEARCH_USER_BY_KEYWORD_FAIL,
  SEARCH_USER_BY_KEYWORD_START,
  SEARCH_USER_BY_KEYWORD_SUCCESS
} from "../actions/searchUserByKeyword";
import {UserState} from "../../interfaces";

const initialState = {
  list: [],
  error: ''
};

const userReducer = (state:UserState | any = initialState, action: any) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default userReducer;
