import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Task4App from './task-4-redux/App';

class App extends Component {
    render() {
        // return (
        //     <BrowserRouter>
        //         <div className="App">
        //             <Layout />
        //             <Switch>
        //                 <Route path="/checkout" component={Checkout} />
        //                 <Route path="/orders" component={Orders} />
        //                 <Route path="/" exact component={BurgerBuilder} />
        //             </Switch>
        //         </div>
        //     </BrowserRouter>
        // );

        return (
            <Task4App/>
        );
    }
}

export default App;
