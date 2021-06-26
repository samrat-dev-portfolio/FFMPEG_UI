import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom'; // BrowserRouter  HashRouter
import { Routes, RoutesUser } from './ffmpeg/Routes';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './ffmpeg/reducers';

const store = createStore(rootReducer, composeWithDevTools());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {
              <Routes />
              // <RoutesUser />
            }
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
