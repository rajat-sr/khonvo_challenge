import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { errorToast, successToast } from '../Toast/Toast';
import axios from 'axios';
import { BASE_URL } from '../../utils';

class SignIn extends Component {
  responseGoogle = response => {
    if (response.error) {
      return errorToast(`Error: ${response.error}`);
    }
    const token = response.tokenObj.id_token;
    localStorage.setItem('khonvotoken', token);

    const url = BASE_URL + '/user';
    axios
      .post(
        url,
        {},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer ' + token,
          },
        },
      )
      .then(() => {
        successToast('Logged in successfully');
      })
      .catch(e => {
        localStorage.removeItem('khonvotoken');
        errorToast(e.message);
      });
  };

  render() {
    return (
      <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_ID}
          render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
              This is my custom Google button
            </button>
          )}
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}

export default SignIn;
