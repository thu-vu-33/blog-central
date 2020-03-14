import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import likes from '../../assets/icons/thumbs-up.svg';
import ROUTES from '../../utils/routes';

const Trending = ({ article, index }) => {
  const {
    title, slug, updated_at, likes_count
  } = article;
  const { username } = article.author
  
    return (
    <div className="trending p-b--10">
      <div className="trending__article">
        <div className="trending__article--index">
          {index+1}
        </div>
        <div className="trending__article--body">
          <Link to={`/article/${slug}`} className="black-text"><p className="article__title">{title}</p></Link>
          <div className="article-info">
            <p>
              <Link  id="author" to={`${ROUTES.profile}/${username}`}>
                {username}
              </Link>
            </p>
            <p className="grey-t">
              {new Date(updated_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              &nbsp;&nbsp;&nbsp;
              {
                <React.Fragment>
                  <img src={likes} alt="" /> &nbsp;
                  <span>{likes_count ? likes_count : "0"}</span>
                </React.Fragment>
              }
            </p>
          </div>
        </div>
    </div>
    </div>
  )
};

Trending.propTypes = {
  article: PropTypes.object.isRequired,
};

export default Trending;