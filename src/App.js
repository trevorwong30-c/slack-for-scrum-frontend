import React from 'react';
import './App.css';
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import createRootState from "./rootState";
import {Provider} from "react-redux";

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import appConfig from './config';
import RootRoute from './rootRoute';

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: createRootState()
  // preloadedState,
  // enhancers: [reduxBatch],
});

axios.interceptors.request.use((config) => {
  //
  // if (appConfig.mockAPIResponse) {
  //   return Promise.resolve(mockResponseMap[config.url]);
  // }

  config.url = appConfig.baseURL + config.url;
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RootRoute />
      </div>
    </Provider>
  );
}

export default App;
