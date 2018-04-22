import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';
import Navigation from './components/UI/Navigation/Navigation';
import Course from './containers/Courses/Course/Course';

class Task3App extends Component {
    render () {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navigation/>
                     <Switch>
                        <Redirect from="/all-courses" to="/courses" />
                        <Route path="/users" exact component={Users}/>
                        <Route path="/courses" exact component={Courses}/>
                        <Route path="/courses/:id" component={Course}/>
                        <Route path="/courses/:id" component={Course}/>
                        <Route path="/" render={() => <h1>Not Found</h1>}/>
                     </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default Task3App;
