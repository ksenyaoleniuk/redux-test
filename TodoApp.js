// import React, {Component} from 'react';
// const {Provider} = ReactRedux;
// const {combineReducers} = Redux;
// const {connect} = ReactRedux;
// import { loadState, saveState } from './localStorage'
// import {v4} from 'node-uuid'
// import throttle from 'lodash/throttle'
// const persistedState = loadState();



// const addTodo  = (text) => ({
//     type: 'ADD_TODO',
//     id: v4(),
//     text,
// });
//
//  const setVisibilityFilter = (filter) =>({
//     type: 'SET_VISIBILITY_FILTER',
//     filter
// });
//
// const toggleTodo= (id) => ({
//     type: 'TOGGLE_TODO',
//     id
// });

// const getVisibleTodos = (todos, filter) => {
//     switch (filter) {
//         case 'SHOW_ALL':
//             return todos;
//         case 'SHOW_COMPLETED':
//             return todos.filter(
//                 t => t.completed
//             );
//         case 'SHOW_ACTIVE':
//             return todos.filter(
//                 t => !t.completed
//             );
//     }
// };

// const todo = (state, action) => {
//     switch (action.type) {
//         case 'ADD_TODO':
//             return {
//                 id: action.id,
//                 text: action.text,
//                 completed: false
//             };
//         case 'TOGGLE_TODO':
//             if (state.id !== action.id) {
//                 return state;
//             }
//
//             return {
//                 ...state,
//                 completed: !state.completed
//             };
//         default:
//             return state;
//     }
// };


// const todos = (state = [], action) => {
//     switch (action.type) {
//         case 'ADD_TODO':
//             return [
//                 ...state,
//                 todo(undefined, action)
//             ];
//         case 'TOGGLE_TODO':
//             return state.map(t => todo(t, action));
//         default:
//             return state;
//     }
// };

// FilterLink is no not a presentational component
// create Link and FilterLink as a container
// const Link = ({active, children, onClick}) => {
//     if (active) {
//         return <span>{children}</span>
//     }
//     return (
//         <a href='#'
//            onClick={e => {
//                e.preventDefault(); // prevent reloading
//                onClick();
//            }}
//         >
//             {children}
//         </a>
//     )
// };

//
// const mapStateToLinkProps = (state,ownProps) => ({
//     active:
//     ownProps.filter === state.visibilityFilter
//
// });
// const mapDispatchToLinkProps = (dispatch, ownProps) => ({
//     onClick() {
//         dispatch(setVisibilityFilter(ownProps.filter))
//     }
// });
//
// const FilterLink = connect(
//     mapStateToLinkProps, mapDispatchToLinkProps
// )(Link);

// const Footer = () => (
//     <p>
//         <FilterLink
//             filter='SHOW_ALL'
//
//         >
//             All
//         </FilterLink>
//         {' '}
//         <FilterLink
//             filter='SHOW_ACTIVE'
//         >
//             Active
//         </FilterLink>
//         {' '}
//         <FilterLink
//             filter='SHOW_COMPLETED'
//         >
//             Completed
//         </FilterLink>
//     </p>
// );

// const Todo = ({onClick, completed, text}) => (
//     <li
//         onClick={onClick}
//         style={{
//             textDecoration:
//                 completed ?
//                     'line-through' :
//                     'none'
//         }}>
//         {text}
//     </li>
// );

// let AddTodo = ({dispatch}) => {
//     let input;
//     return (
//         <div>
//             <input ref={node => {
//                 input = node;
//             }}/>
//             <button onClick={() => {
//                 dispatch(addTodo(input.value));
//
//                 input.value = '';
//             }}>
//                 Add Todoo
//             </button>
//         </div>
//     );
// };
//
// //create container component that will dispatch function as a prop
// AddTodo = connect()(AddTodo);
// const TodoList = ({todos, onTodoClick}) => (
//     <ul>
//         {todos.map(todo =>
//             <Todo
//                 key={todo.id}
//                 {...todo}
//                 onClick={() => onTodoClick(todo.id)}
//             />
//         )}
//     </ul>
// );
// // this function return state (my todos) and filter(assign to the
// // my todos) of TodoApp current state
// const mapStateToTodoListProps = (state) => ({
//         todos: getVisibleTodos(
//             state.todos,
//             state.visibilityFilter
//         )
//     });
// //change the state by dispatch method
// const mapDispatchTodoListTProps = (dispatch) => ({
//         onTodoClick(id){
//             dispatch(toggleTodo(id))
//         }
//     });

// // function need to be called twice (second to the presentational component)
// const VisibleTodoList = connect(
//     mapStateToTodoListProps,
//     mapDispatchTodoListTProps
// )(TodoList);









// const todoApp = combineReducers({
//     todos,
//     visibilityFilter
// });

// const TodoApp = ({store}) => (
//     <div>
//         <AddTodo/>
//         <VisibleTodoList/>
//         <Footer/>
//     </div>
// );
//
// const {createStore} = Redux;
// const store=createStore(todoApp, persistedState);
// store.subscribe(throttle(() => {
//     saveState({
//         todos: store.getState().todos
//     });
// }, 1000));
//
// ReactDOM.render(
//     <Provider store = {store}>
//         <TodoApp/>
//     </Provider>,
//     document.getElementById('root'));
//
//
