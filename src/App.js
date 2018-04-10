import React, { Component } from 'react';

import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>This is my React app!</h1>
          <Layout />
          <BurgerBuilder />
      </div>
    );
  }
}

export default App;
