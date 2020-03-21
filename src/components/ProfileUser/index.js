import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from "react-avatar";

import capitalize from '../../utils/capitalize';
import Follow from '../FollowButton';

const ProfileUser = ({
  data, currentUser, follow, listFollowers, listFollowing,
}) => (
  <div className="row p-t--20 p-b--20">
    <div className="col s8">
      <div className="m-b--15 username-line">
        <h4>{capitalize(data.username)}</h4>
      </div>

      <div className="m-b--15 p-r--100 line-space">
        <p>{data.bio}</p>
      </div>

      <div className="m-b--15">
        <a href="#following" className="m-r--15" onClick={listFollowing}>
          {data.follows}
          {' '}
Following
        </a>
        <a href="#followers" className="follow-text" onClick={listFollowers}>
          {data.followers <= 1
            ? `${data.followers}${' Follower'}`
            : `${data.followers}${' Followers'}`}
        </a>
      </div>

      <div className="m-b--15">
        {currentUser && currentUser.email === data.email ? (
          <Link
            to={`/profile/${data.username}/edit`}
            className="waves-effect waves-light btn btn--rounded"
          >
            Edit Profile
          </Link>
        ) : (
          <Follow
            follow={follow}
            user={data}
            classname="waves-effect waves-light btn btn--rounded"
          />
        )}
      </div>
    </div>
    <div className="col s4">
    <Avatar
          name={data.username}
          size="100"
          textSizeRatio="1.75"
          className={`responsive-img circle`}
          src={data.image}
        />
    </div>
  </div>
);

ProfileUser.propTypes = {
  follow: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  listFollowers: PropTypes.func.isRequired,
  listFollowing: PropTypes.func.isRequired,
};

export default ProfileUser;