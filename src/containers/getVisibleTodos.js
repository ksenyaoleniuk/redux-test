import TodoList from "./src/components/TodoList"

const {connect } = ReactRedux;

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        default:
            throw new Error(`Unknown filter: ${filter}.`);
    }
};

const mapStateToProps = (state, ownProps) => ({
    todos: getVisibleTodos(
        state.todos,
        ownProps.filter
    )
})

const mapDispatchToProps = (dispatch) =>{
    return {
        onTodoClick: (id) => {
            dispatch({
                type: 'TOGGLE_TODO',
                id
            })
        }
    };
};

export const VisibleTodoList = connect (
    mapStateToProps,
    mapDispatchToProps
)(TodoList);