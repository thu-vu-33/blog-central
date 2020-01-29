import React from 'react';
import GoogleLogin from 'react-google-login';
 
class Button extends React.Component {
    render() {
      const { clientId, responseGoogle, googleFailure } = this.props
        return (
          <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={googleFailure}
          cookiePolicy={'single_host_origin'}
        />
        );
    }
}
 
export default GoogleLogin(Button);