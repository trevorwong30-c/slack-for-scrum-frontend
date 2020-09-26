import axios from 'axios';
import appConfig from "../../config";
import mockResponseMap from "../mockResponses";

export const LOAD_REQUIREMENT_LIST_SUCCESS = "LOAD_REQUIREMENT_LIST_SUCCESS";
export const LOAD_REQUIREMENT_LIST_FAIL = "LOAD_REQUIREMENT_LIST_FAIL";

axios.interceptors.request.use((config) => {

  if (appConfig.mockAPIResponse) {
    return Promise.resolve(mockResponseMap[config.url]);
  }

  config.url = appConfig.baseURL + config.url;
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export const loadRequirementList = () => {
  return dispatch => {

    axios.get("/requirement/list").then((response) => {
      console.log("response", response);
    })
    .catch((error) => {
      console.log("catch", error);
    })
    .finally((response) => {
      console.log("finally", response);
    });

    // return axios.get("/requirement/list").then((response) => {
    //   console.log(`response`, response);
    //   dispatch(loadRequirementListSuccess(response.list));
    // });
  }
}

export const loadRequirementListSuccess = (list) => {
  return {
    type: LOAD_REQUIREMENT_LIST_SUCCESS,
    list
  };
}

export const loadRequirementListFailure = (error) => {
  return {
    type: LOAD_REQUIREMENT_LIST_FAIL,
    error
  };
}