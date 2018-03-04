//done
import React from 'react'
import { addTodo } from '../actions/index'

const {connect} = ReactRedux;

let AddTodo = ({dispatch}) => {
    let input;
    return (
        <div>
            <input ref={node => {
                input = node;
            }}/>
            <button onClick={() => {
                dispatch(addTodo(input.value));
                input.value = '';
            }}>
                Add Todoo
            </button>
        </div>
    );
};

// create container component that will dispatch function as a prop
AddTodo = connect()(AddTodo);
export default AddTodo