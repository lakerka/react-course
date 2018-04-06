import React, { Component } from 'react';

import './App.css';

import { Task1App } from './task-1/user-actions';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>This is my React app!</h1>
          <Task1App />
      </div>
    );
  }
}

export default App;
