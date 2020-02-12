import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootReducer} from '../reducers';
import {rootSaga} from '../sagas'

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
    // applyMiddleware(thunk as ThunkMiddleware, sagaMiddleware)
  ));

sagaMiddleware.run(rootSaga)

export default store;
