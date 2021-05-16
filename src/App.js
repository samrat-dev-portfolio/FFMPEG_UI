import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom'; // BrowserRouter  HashRouter

import {Routes, RoutesUser} from './ffmpeg/Routes';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
         {
           <Routes />
          // <RoutesUser />
         } 
        </div>
      </Router>
    );
  }
}

export default App;
