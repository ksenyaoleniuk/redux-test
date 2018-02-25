function counter(state = 0, action) {

    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }

}

const createStore = (reducer) => {
    let state;
    let listeners = [];
    const getState = () =>
        state;// return the current state of the variable
    const dispatch = (action) => {
        state = reducer(state, action); // updating state via reducer
        listeners.forEach(listener => listener()); // updating listener because state was changed
    };
    const subscribe = (listener) => {
        listeners.push(listener); // add each listener to array
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };
    dispatch({}); // to return initial value
    return {getState, dispatch, subscribe}
};

const store = createStore(counter);
const render = () => {
    document.body.innerText = store.getState(); //will see the UI change while state changes
};

store.subscribe(render);
render();
document.addEventListener('click', () => { //
    store.dispatch({type: 'INCREMENT'}) // actions that can change the state of the app (in this case INC DEC)
});