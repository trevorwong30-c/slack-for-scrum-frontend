// import { AxiosInstance as axios } from "axios";

export const LOAD_DASHBOARD_DATA_SUCCESS = "LOAD_DASHBOARD_DATA_SUCCESS";

export const loadDashboardDataSuccess = (data) => {
  return {
    type: LOAD_DASHBOARD_DATA_SUCCESS,
    data
  };
};

export const loadDashboardData = () => {
  return (dispatch) => {
    // return axios.get(`https://dummycityuprojectapi.com/dashboard`)
    //   .then((response) => {
    //     console.log(`loadDashboardDataAction:`, response);
    //     dispatch(loadDashboardDataSuccess(response));
    //   });
    let payload = {
      data: ["apple", "orange"]
    };
    dispatch(loadDashboardDataSuccess(payload.data));
  };
};
