import React from 'react';
import TitleBar from './components/TitleBar/TitleBar';
import View from './containers/View';
import SignIn from './components/SignIn/SignIn';
import './App.css';

function App() {
  return (
    <div>
      <SignIn/>
      {/* <TitleBar />
      <View /> */}
    </div>
  );
}

export default App;
