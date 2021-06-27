import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import getCurrentUser from '../../utils/auth';
import ROUTES from '../../utils/routes';
import M from 'materialize-css';

import notification from '../../assets/icons/bell.svg';
import search from '../../assets/icons/search.svg';
import account from '../../assets/icons/account.svg'
import InlineLoader from '../InlineLoader';


class Header extends React.Component {
  componentDidMount() {
    const el = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(el);
  }

  logout = () => {
    localStorage.removeItem('user');
  }

  renderDropDown = user => (
    <li>
      { user && (
        <React.Fragment>
          <a className="dropdown-trigger black-text" href="!#" data-target="profile">
          <div>
            <img src={account} alt="" className="icon" />
          </div>
          </a>
          <ul id="profile" className="dropdown-content  dropdown-content--nav">
            <li>
              <NavLink to={`${ROUTES.profile}/${user.username}`}>Profile</NavLink>
            </li>
            <li className="divider" tabIndex="-1" />
            <li>
              <NavLink to={`${ROUTES.createArticleUrl}`}>New story</NavLink>
            </li>
            <li className="divider" tabIndex="-1" />
            <li>
              <NavLink to={`${ROUTES.profile}/${user.username}#profile`}>My articles</NavLink>
            </li>
            <li className="divider" tabIndex="-1" />
            <li>
              <NavLink to={`${ROUTES.profile}/${user.username}#bookmarks`}>Favorite</NavLink>
            </li>
            <li className="divider" tabIndex="-1" />
            <li>
              <NavLink to={`${ROUTES.home}`} onClick={this.logout}>Logout</NavLink>
            </li>
          </ul>
        </React.Fragment>)
        }
    </li>
  )

  renderIcons = user => (
    <React.Fragment>
            <li>
      <NavLink to={ROUTES.magazines} className="black-text" id="magazine">
          <div>
            <p>Magazines</p>
          </div>
        </NavLink>
      </li>

<li>
  <NavLink to={ROUTES.books} className="black-text" id="books">
    <div>
      <p>Books</p>
    </div>
  </NavLink>
</li>
      
            <li>
      <NavLink to={ROUTES.videos} className="black-text" id="videos">
          <div>
           
            <p>Videos</p>
          </div>
        </NavLink>
      </li>

      <li>
      <NavLink to={ROUTES.blogs} className="black-text" id="blogs">
          <div>
           
            <p>Blogs</p>
          </div>
        </NavLink>
      </li>

      <li>
      <NavLink to={ROUTES.guide} className="black-text" id="guide">
          <div>
           
            <p>Guide</p>
          </div>
        </NavLink>
      </li>


      <li>
        <NavLink to={ROUTES.articles} className="black-text" id="search">
          <div>
            <img src={search} alt="" className="icon" />
          </div>
        </NavLink>

      </li>
      <ul>
        {user ? (
          <a href="#!" className="black-text" id="search">
            <div>
              <img src={notification} alt="" className="icon" />
            </div>
          </a>
        ) : (
          <React.Fragment>
            <li>
              <NavLink to={ROUTES.signin} className="black-text">Sign in</NavLink>
            </li>
            <li>
              <NavLink to={`${ROUTES.signup}`} className="waves-effect waves-light btn-small ">Get started</NavLink>
            </li>
          </React.Fragment>

        )
    }
      </ul>
    </React.Fragment>
  )

  render() {
    const user = getCurrentUser();
    const { loading } = this.props;
    return (
      <React.Fragment>
        <header>
          <nav className="white">
            <div className="nav-wrapper maxWidth1032">
              <NavLink to="/" className="nav-brand-logo black-text hide-on-small-only">
                  Tieng Anh Song Ngu
              </NavLink>
              <NavLink to="/" className="nav-brand-logo black-text hide-on-med-and-up">
                  Blog C.
              </NavLink>

              <ul id="nav-mobile" className="right nav-icons hide-on-med-and-down">
                <li className="black-text hide search-input">
                  <input type="text" placeholder="Search..." className="search" />
                </li>
                {this.renderIcons(user)}
                {this.renderDropDown(user)}
              </ul>

            </div>
          </nav>
        </header>
        {loading && <InlineLoader />}
      </React.Fragment>
    );
  }
}
Header.propTypes = {
  loading: PropTypes.bool,
};

export default Header;