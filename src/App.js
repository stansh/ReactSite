import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore(); // getting the store value from configureStore.js

/* <Provider store={store}>  --  makes the store available to all connected copmonents, childern of App */
class App extends Component {
    render() {
        return (
            <Provider store={store}>  
            <BrowserRouter>
              <div className="App">
                <Main />
              </div>
            </BrowserRouter>
          </Provider>
        );
    }
}

export default App;