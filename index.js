import Root from './src/components/Root'
import configureStore from './configureStore'
import React from 'react';
 const store = configureStore();
 ReactDOM.render(

    <Root store={store} />,
    document.getElementById('root')
);

// const {Provider} = ReactRedux;
// const {createStore} = Redux;
// import todoApp from './src/reducers/index'
// import App from './src/components/App'
//
// let store = createStore(todoApp);
//
// ReactDOM.render(
//     <Provider store={store}>
//          <App />
//     </Provider>,
//     document.getElementById('root')
// )
