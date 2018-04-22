import React, { Component } from 'react';

import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import Task3App from './task-3-routing/Task3App';

class App extends Component {
    render() {
        return <Task3App/>;
        // return (
        //     <div className="App">
        //     <Layout />
        //     <BurgerBuilder />
        //     </div>
        // );
    }
}

export default App;
