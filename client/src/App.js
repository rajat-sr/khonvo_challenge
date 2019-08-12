import React from 'react';
import { connect } from 'react-redux';
import TitleBar from './components/TitleBar/TitleBar';
import View from './containers/View';
import SignIn from './components/SignIn/SignIn';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.showLoginPage ? (
          <SignIn />
        ) : (
          <>
            <TitleBar />
            <View />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showLoginPage: state.showLoginPage,
  };
};

export default connect(mapStateToProps)(App);
