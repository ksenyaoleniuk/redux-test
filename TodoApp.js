const {Component} = React;


const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(
                t => t.completed
            );
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => !t.completed
            );
    }
};

// FilterLink is no not a presentational component
// create Link and FilterLink as a container
const Link = ({active, children, onClick}) => {
    if (active) {
        return <span>{children}</span>
    }
    return (
        <a href='#'
           onClick={e => {
               e.preventDefault();
               onClick();
           }}
        >
            {children}
        </a>
    )
};
class FilterLink extends Component{
    componentDidMount(){
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());}
        componentWillUnmount(){
            this.unsubscribe();
        }

    render(){
        const props = this.props;
        const {store} = this.context;
        const state = store.getState();
        return(
            <Link active = {props.filter === state.visibilityFilter}
            onClick = {() => store.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter: props.filter
            })}>
                  {props.children}
                </Link>

        );
    }
}
FilterLink.contextTypes = {
    store: React.PropTypes.object
}
let nextTodoId = 0;

const Footer = () => (
    <p>

        <FilterLink
            filter='SHOW_ALL'

        >
            All
        </FilterLink>
        {' '}
        <FilterLink
            filter='SHOW_ACTIVE'
        >
            Active
        </FilterLink>
        {' '}
        <FilterLink
            filter='SHOW_COMPLETED'
        >
            Completed
        </FilterLink>
    </p>
);
const Todo = ({onClick, completed, text}) => (
    <li
        onClick={onClick}
        style={{
            textDecoration:
                completed ?
                    'line-through' :
                    'none'
        }}>
        {text}
    </li>
);

let AddTodo = ( {dispatch}) => {
    let input;
    return (
        <div>
            <input ref={node => {
                input = node;
            }}/>
            <button onClick={() => {
                    dispatch({
                    type: 'ADD_TODO',
                    id: nextTodoId++,
                    text: input.value
                });

                input.value = '';
            }}>
                Add Todoo
            </button>
        </div>
    );
};
const { connect } = ReactRedux;

//create container component that will dispatch function as a prop
AddTodo = connect(
    // state => {
    //     return {}; //no props that depends on Toodo component
    // },
    // null,
    // dispatch => {
    //     return { dispatch }; // return as a prop
    // null //second arg always will be dispatch - no need to write it

)(AddTodo);
const TodoList = ({todos, onTodoClick}) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
            />
        )}
    </ul>
);
// this function return state (my todos) and filter(assign to the
// my todos) of TodoApp current state
const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos (
            state.todos,
            state.visibilityFilter
        )
    };
};
//change the state by dispatch method
const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch({
                type: 'TOGGLE_TODO',
                id
            })
        }
    };
};

// function need to be called twice (second to the presentational component)
const VisibleTodoList = connect (
    mapStateToProps,
    mapDispatchToProps
)(TodoList);


const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

// can add more info to the object without changing existing reducer
const visibilityFilter = (state = 'SHOW_ALL',
                          action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};
// class Provider extends Component {
//     getChildContext() {
//         return {
//             store: this.props.store
//         };
//     }
//     render() {
//         return this.props.children;
//     }
// }
//
// Provider.childContextTypes = {
//     store: React.PropTypes.object
// };

const { Provider } = ReactRedux;

const {combineReducers} = Redux;

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const TodoApp = ({ store }) => (
    <div>
        <AddTodo/>
        <VisibleTodoList/>
        <Footer/>
    </div>
);

const {createStore} = Redux;

ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <TodoApp />
    </Provider>,
    document.getElementById('root'));

// store.subscribe(render);
// render();




