import { createStore, applyMiddleware, compose } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer from '../reducers';
import { AppActions } from "../types/actions";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk as ThunkMiddleware)
  ));

  export default store;

//   import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk, { ThunkMiddleware } from "redux-thunk";
// import { expenseReducer } from "../reducers/expenses";
// import { AppActions } from "../types/actions";

// export const rootReducer = combineReducers({
//   expenses: expenseReducer
// });

// export type AppState = ReturnType<typeof rootReducer>;

// export const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)