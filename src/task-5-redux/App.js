import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Persons from './containers/Persons';
import store from './store';

class Task5App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <ol>
                        <li>
                            Turn this app into one which does NOT use local state (in components) but instead uses Redux
                        </li>
                    </ol>
                    <Persons />
                </div>
            </Provider>
        );
    }
}

export default Task5App;
