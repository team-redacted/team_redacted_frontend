import React from "react";

import { Provider } from 'mobx-react';
import { store } from "./stores/Stores";

import Actions from "./components/Actions/Actions";
import Board from './components/Board/Board';
import Cards from "./components/Cards/Cards";

import './App.css';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
      <div className='content'>
        <Cards/>
        <Board/>
        <Actions/>
      </div>
    </div>
    </Provider>
  )
}

export default App;
