//done
const {combineReducers} = Redux;
import todos , * as fromTodos from './todos'
// import todos  from './todos'

const todoApp = combineReducers({
    todos,
});
export default todoApp

export const getVisibleTodos = (state, filter) =>
    fromTodos.getVisibleTodos(state.todos, filter);