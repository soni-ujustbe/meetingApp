import {applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { createWrapper } from "next-redux-wrapper";

//const composeEnhancers = composeWithDevTools();

const loggerMiddleware = createLogger();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk, loggerMiddleware)) )
//const store = createStore(rootReducer)

//export const wrapper = createWrapper(store)

export default store