import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/index';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {reactotron} from '../ReactotronConfig';
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducers,
    {},
    composeEnhancers(reactotron.createEnhancer!(), applyMiddleware(thunk, logger))
)
