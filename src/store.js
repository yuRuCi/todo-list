import { createStore } from 'redux';
import { todoListReducers } from './reducers'

export default createStore(todoListReducers)