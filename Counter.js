function counter (state = 0, action) {

    switch (action.type){
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }

}


const { createStore } = Redux;

const store = createStore(counter);

const render = () => {
    document.body.innerText = store.getState(); // will see the UI change while state changes
};
;
store.subscribe(render);
render();
document.addEventListener('click', () => {
    store.dispatch({type: 'INCREMENT'}) // actions that can change the state of the app (in this case INC DEC)
});