import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import { persistStore, persistReducer } from 'redux-persist';
import * as localForage from "localforage";

export const history = createHistory();

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(routerMiddleware(history), thunk);
    } else {
        return applyMiddleware(routerMiddleware(history), thunk, createLogger())
    }
};

const persistConfig = {
    key: 'root',
    storage: localForage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeWithDevTools(getMiddleware()));
export const persistor = persistStore(store);