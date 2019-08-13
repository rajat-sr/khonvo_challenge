import React, { Component } from 'react';
import { Button, Card, H3, Radio, RadioGroup, Intent, Elevation } from '@blueprintjs/core';
import { GoogleLogin } from 'react-google-login';
import { errorToast, successToast } from '../Toast/Toast';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import classes from './SignIn.module.css';

class SignIn extends Component {
  state = {
    askUserRole: false,
    userRole: 'PRODUCER',
  };

  handleUserRoleChange = event => {
    const value = event.currentTarget.value;
    this.setState({ userRole: value });
  };

  handleButtonClick = () => {
    const url = BASE_URL + '/user/role';
    axios
      .patch(
        url,
        {
          role: this.state.userRole,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('khonvotoken'),
          },
        },
      )
      .then(res => {
        successToast('Logged in');
        localStorage.setItem('role', res.data.role);
        this.props.setAuthenticated(res.data.role);
      })
      .catch(e => {
        localStorage.clear();
        errorToast(e.response ? e.response.data : e.message);
      });
  };

  responseGoogle = response => {
    if (response.error) {
      return errorToast(`Error: ${response.error}`);
    }
    const token = response.tokenObj.id_token;
    localStorage.setItem('khonvotoken', token);
    localStorage.setItem('name', response.tokenObj.name);
    localStorage.setItem('email', response.tokenObj.email);

    const url = BASE_URL + '/user';
    axios
      .post(url)
      .then(res => {
        if (res.data.newUser) {
          this.setState({ askUserRole: true });
        } else {
          localStorage.setItem('role', res.data.role);
          successToast('Logged in');
          this.props.setAuthenticated(res.data.role);
        }
        console.log('Google Authentication Done');
      })
      .catch(e => {
        console.log('Google Authentication Failed', e);
        localStorage.clear();
        errorToast(e.response ? e.response.data : e.message);
      });
  };

  render() {
    return (
      <div className={classes.page}>
        <Card className={classes.card} elevation={Elevation.TWO}>
          <H3 style={{ marginTop: '20px' }}>Khonvo - Challenge</H3>
          <p style={{ color: '#aaa', marginBottom: '50px' }}>Rajat Srivastava</p>
          {this.state.askUserRole ? (
            <div>
              <RadioGroup
                label="Please choose your role."
                onChange={this.handleUserRoleChange}
                selectedValue={this.state.userRole}
                inline
              >
                <Radio label="Producer" value="PRODUCER" />
                <Radio label="Querier" value="QUERIER" />
              </RadioGroup>
              <Button intent={Intent.PRIMARY} onClick={this.handleButtonClick}>
                Submit
              </Button>
            </div>
          ) : (
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_ID}
              render={renderProps => (
                <button
                  className={classes.google}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Continue with Google
                </button>
              )}
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setAuthenticated: role => dispatch(actionCreators.setAuthenticated(role)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
