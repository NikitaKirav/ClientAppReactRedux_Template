import {createStore, combineReducers, applyMiddleware} from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import articlesReducer from './articles-reducer.js';


let reducers = combineReducers({
    form: formReducer,
    blog: articlesReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;