import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css';
import Container from '@material-ui/core/Container';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import facebook from '../../assets/icons/facebook.svg';
import google from '../../assets/icons/google.svg';
import mail from '../../assets/icons/mail.svg';
import { facebookSignin, googleSignin } from './actions';

import config from '../../config';
import InlineLoader from '../../components/InlineLoader';
import ROUTES from '../../utils/routes';


class SocialAuth extends React.Component {
  static defaultProps = {
    oauth: {},
  }
  state = {
    error: null,
    isFetching: false,
  };
  responseGoogle = (response) => {
    const provider = 'google-oauth2';
    const { googleUser, history } = this.props;
    googleUser({
      cred: {
        provider,
      access_token: response.accessToken} }, history);
  }

  responseFacebook = (response) => {
    const provider = 'facebook';
    const { facebookUser, history } = this.props;
    facebookUser({
      cred: {
        provider,
      access_token: response.accessToken} }, history);
  }

  toaster = () => {
    M.toast({ html: 'Something went wrong', classes: 'danger' });
  }

  render() {
    const {error, isFetching } = this.state;
    const { errors } = this.props.oauth;
    return (
      <React.Fragment>
        <div className="row">
        <Container className="col m4 s12 offset-m4 auth">
          <div className="card card--auth p-b--40">
          {isFetching && <InlineLoader />}
          {error && this.toaster()}
          {errors && this.toaster()}
          <div className="card-content">
            <span className="card-title center-align nav-brand-logo text-primary m-b--30 m-t--15">Tieng Anh Song Ngu</span>
            <Link to={ROUTES.signinWithEmail} className="waves-effect waves-light btn-flat btn--default m-b--15  btn--block">
              <img src={mail} alt="Sign up with email" className="icon" />
                  Sign in with email
            </Link>
            <GoogleLogin
              render={renderProps => (
                <button className="waves-effect waves-light btn-flat btn--default m-b--15  btn--block" onClick={renderProps.onClick}><img src={google} alt="Sign up with google" className="icon" />Signin with Google</button>
              )}
              clientId={config.GOOGLE_APP_ID}
              buttonText="Signin with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.toaster}
              icon={<img src={google} alt="Sign up with google" className="icon" />}
            />
            <FacebookLogin
              cssClass="waves-effect waves-light btn-flat btn--default m-b--15  btn--block"
              appId={config.FACEBOOK_APP_ID}
              autoLoad={false}
              isDisabled={false}
              textButton="Signin with Facebook"
              fields="name,email,picture"
              callback={this.responseFacebook}
              icon={<img src={facebook} alt="Sign up with facebook" className="icon" />}
            />
            <div className="m-t--20">
              <span>
                    Want to go classical?
                <Link to="/signup"> Sign up here</Link>
              </span>
            </div>
          </div>
        </div>
      </Container>
      </div>
      </React.Fragment>
    );
  }
}

SocialAuth.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => ({
  oauth: state.oauth,
});

const mapDispatchToProps = dispatch => bindActionCreators({ googleUser: googleSignin, facebookUser: facebookSignin }, dispatch);

export default connect( mapStateToProps,
  mapDispatchToProps,
) (SocialAuth);