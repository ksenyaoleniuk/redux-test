import TodoList from "./src/components/TodoList"

const {connect } = ReactRedux;

export const getVisibleTodos = (todos, filter) => {
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

const mapStateToProps
    = (state) => {
    return {
        todos: getVisibleTodos (
            state.todos,
            state.visibilityFilter)

    }
}

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