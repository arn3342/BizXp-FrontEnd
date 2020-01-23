import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootWatcher from './sagas/saga';

const middleware = createSagaMiddleware();
const initialState = {};
// const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null

// let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && 
// window.__REDUX_DEVTOOLS_EXTENSION__();
// if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
//     devTools = a => a;
// }

// const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null


 const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()        
    )
);

middleware.run(rootWatcher);


export default store;