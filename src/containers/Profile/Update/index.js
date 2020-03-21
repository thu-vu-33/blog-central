import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import M from 'materialize-css';
import updateUser from './actions';
import validateInput from '../../../utils/validateInput';
import uploader from '../../../utils/uploader';
import ProfileInput from '../../../components/ProfileInput';
import Header from '../../../components/Header';
import Avatar from "react-avatar";
import getCurrentUser from '../../../utils/auth';

class UpdateProfile extends Component {
  state = {
    profile: {
      username: '',
      bio: '',
      image: '',
    },
    validation: {},
    fileInput: React.createRef(),
    uploaded: null,
  };

  componentDidMount() {
    const profile = getCurrentUser()
    let data;
    if (profile) {
      data = JSON.parse(JSON.stringify(profile));
    }
    this.setState({
      profile: {
        username: data.username,
        bio: data.bio,
        image: data.image,
      },
    });
  }

  handleChange = (event) => {
    this.setState({
      profile: {
        ...this.state.profile,
        [event.target.name]: event.target.value,
      },
      validation: {
        [event.target.name]: validateInput(event.target.name, event.target.value),
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { updateProfile, history } = this.props;
    updateProfile({ user: this.state.profile }, history);
  };

  updateProgress = (e) => {
    this.setState({
      uploaded: Math.round((e.loaded / e.total) * 100),
    });
  };

  handleUpload = (event) => {
    event.preventDefault();
    const reader = new FileReader();

    reader.onload = (e) => {
      this.setState({
        profile: {
          ...this.state.profile,
          image: e.target.result,
        },
      });
    };
    reader.readAsDataURL(this.state.fileInput.current.files[0]);

    uploader({ body: this.state.fileInput.current.files[0], progress: this.updateProgress })
      .then((response) => {
        this.setState({
          profile: {
            ...this.state.profile,
            image: response.secure_url,
          },
        });
      })
      .catch(err => console.log(err));
  };

  toaster = () => {
    M.toast({ html: 'Your profile has been successfully updated', classes: 'success' });
  };

  errorToaster = (error) => {
    M.toast({ html: error, classes: 'danger' });
  };

  render() {
    const { success, isFetching, errors } = this.props.edit;
    if (this.state.uploaded === 100) {
      this.setState({
        uploaded: null,
      });
    }

    let error;
    if (errors) {
      error = errors;
    }

    return (
      <div>
        <Header {...this.props} />
        <div className="container">
          {success && this.toaster()}
          {errors && this.errorToaster(error.errors.username[0])}
          {/* Main */}
          <div className="row m-t--20">
            {/* User Profile */}
            <div className="row p-t--20 p-b--20 edit-profile">
              <div className="col m8 s12 profile-form">
                <div className="m-b--15">
                  <ProfileInput
                    type="text"
                    classValue="input-edit"
                    value={this.state.profile.username}
                    name="username"
                    onChange={this.handleChange}
                    holder="Edit your username"
                    validation={this.state.validation.username}
                  />
                </div>

                <div className="m-b--15">
                  <ProfileInput
                    type="text"
                    classValue="input-edit input-edit--small"
                    value={this.state.profile.bio}
                    name="bio"
                    onChange={this.handleChange}
                    holder="Edit your bio"
                    validation={this.state.validation.bio}
                  />
                </div>

                <div className="m-b--15">
                  <button
                    type="submit"
                    className="waves-effect waves-light btn btn--rounded"
                    onClick={this.handleSubmit}
                    disabled={isFetching}
                  >
                    {isFetching ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
              <div className="col m4 s12 profile-image">
                <div className="edit-hover">
                <Avatar
                  name={this.state.profile.username}
                  size="100"
                  textSizeRatio="1.75"
                  className={`responsive-img circle avatar--small`}
                  src={this.state.profile.image}
                />
                  <label htmlFor="image">
                    <div className="toggle">
                      <div className={this.state.uploaded ? 'toggle-loading' : 'toggle-text'}>
                        {this.state.uploaded && `${this.state.uploaded}%`}
                      </div>
                    </div>
                  </label>
                  <input
                    id="image"
                    className="change-image"
                    type="file"
                    onChange={this.handleUpload}
                    ref={this.state.fileInput}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProfile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  history: PropTypes.object,
  edit: PropTypes.object,
  profile: PropTypes.object,
};

const mapStateToProps = state => ({
  profile: state.getProfile.payload,
  edit: state.editProfile,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateProfile: updateUser,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateProfile);