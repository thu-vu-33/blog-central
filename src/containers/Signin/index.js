// This is a smart component which is aware of redux
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css';

import InputField from '../../components/InputField';
import Errors from '../../components/Errors';
import Buttons from '../../components/SigninButtons';
import signinAction from './actions';

class Signin extends Component {
  static defaultProps = {
    signin: {},
  }

  state = {
    email: '',
    password: '',
  };

  handleChange = (e) => {
    localStorage.removeItem('flash');
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { signinUser, history } = this.props;
    signinUser({ user: this.state }, history);
  };

  toaster = () => {
    M.toast({ html: localStorage.getItem('flash'), className: 'success' });
  }

  renderInput = (name, failure, errors, value) => (
    <InputField
      name={`${name}`}
      label={`Enter your ${name}`}
      type={`${name}`}
      value={value}
      onChange={this.handleChange}
      failure={failure}
      errors={errors}
    />
  )

  render() {
    const { errors, failure, isFetching } = this.props.signin;
    return (
      <div className="row">
        {localStorage.getItem('flash') ? this.toaster() : '' }
        <div className="col m4 s12 offset-m4 auth">
          <div className="card card--auth">
            <div className="card-content">
              <span className="card-title center-align nav-brand-logo text-primary">Tieng Anh Song Ngu</span>
              <Errors
                name="error"
                errors={errors}
                failure={failure}
              />
              <form id="loginForm" onSubmit={this.handleSubmit}>
                {this.renderInput('email', failure, errors, this.state.email)}
                {this.renderInput('password', failure, errors, this.state.password)}
                <Buttons
                  isFetching={isFetching}
                  onClick={this.handleSubmit}
                />

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signin.propTypes = {
  signinUser: PropTypes.func.isRequired,
  signin: PropTypes.shape({
    errors: PropTypes.isRequired,
    failure: PropTypes.isRequired,
    isFetching: PropTypes.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = state => ({
  signin: state.signin,
});

const mapDispatchToProps = dispatch => bindActionCreators({ signinUser: signinAction }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signin);