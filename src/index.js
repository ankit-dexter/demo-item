import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer from './Reducer/storeToDo';
import thunk from 'redux-thunk';


// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

// const rootReducer = combineReducers({
//     toDoReducer: reducer
// });

// const store = createStore(reducer, composeEnhancers(
//     applyMiddleware(thunk)
// ));
const store = createStore(reducer, applyMiddleware(thunk)
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>

);

ReactDOM.render(app, document.getElementById('root'));
