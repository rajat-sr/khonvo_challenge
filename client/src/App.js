import React from 'react';
import Querier from './containers/Querier/Querier';
import Producer from './containers/Producer/Producer';
import TitleBar from './components/TitleBar/TitleBar';
import './App.css';

function App() {
  return (
    <div>
      <TitleBar />
      {/* <Querier /> */}
      <Producer />
    </div>
  );
}

export default App;
