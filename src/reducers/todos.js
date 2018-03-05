//done
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        case 'TOGGLE_TODO':
            return state.map(todo =>
                (todo.id === action.id)
                    ? {...todo, completed: !todo.completed}
                    : todo
            )
        default:
            return state
    }
}

export default todos

export const getVisibleTodos = (state, filter) => {
    switch (filter) {
        case 'all':
            console.log(filter,'all:',state);
            return state;
        case 'completed':
            console.log('comp:',state);
            return state.filter(t => t.completed);

        case 'active':
            console.log('active:',state);

            return state.filter(
                t => !t.completed
            );
        default:
            throw new  Error(`Unknown filter: ${filter}.`);
    }
};
