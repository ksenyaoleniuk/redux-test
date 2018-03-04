//done
const {combineReducers} = Redux;
import todos from './todos'
const todoApp = combineReducers({
    todos,
});
export default todoApp