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
const visibilityFilter = (
    state = 'SHOW_ALL',
    action
) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};
// combine reducer from existing reducer + new part of state (visibility in this case)
const todoApp = (state = {}, action) => {
    return {
        todos: todos(
            state.todos,
            action
        ),
        visibilityFilter: visibilityFilter(
            state.visibilityFilter,
            action
        )
    };
};
const { createStore } = Redux;
const store = createStore(todoApp);


store.getState();
const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [{
        id: 0,
        text: 'Learn Redux',
        completed: false
    }];
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(
        todos(stateBefore, action)).toEqual(stateAfter);

};

//create an action to change state and tests this state

const testtoogleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go',
            completed: false
        }
    ];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1

    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go',
            completed: true
        },

    ];
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(
        todos(stateBefore, action)).toEqual(stateAfter);

};
testAddTodo();
testtoogleTodo();

console.log('All tests passed.');