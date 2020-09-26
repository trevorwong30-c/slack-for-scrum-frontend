import React from 'react';
import './App.css';
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import createRootState from "./rootState";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import RequirementRoute from "./requirement/route";

import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: createRootState()
  // preloadedState,
  // enhancers: [reduxBatch],
});

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <RequirementRoute />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
