import React, { Component } from 'react';

import './App.css';

import { Task2App } from './task-2/components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>This is my React app!</h1>
          <Task2App />
      </div>
    );
  }
}

export default App;
