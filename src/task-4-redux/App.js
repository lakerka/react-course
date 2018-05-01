import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './store/reducer';
import Counter from './containers/Counter/Counter';
import './App.css';

const store = createStore(reducer);


class Task4App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Counter />
                </div>
            </Provider>
        );
    }
}

export default Task4App;
