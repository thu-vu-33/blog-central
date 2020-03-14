import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ROUTES from '../../utils/routes';


const Articles = ({ article}) => {
  const {
    preview, image, title, slug, average_rating, created_at,
  } = article;
  const {username} = article.author
  console.log(article);
  

  return (
    <div className="custom-card">
      <div className="col l9 m9 s12">
        <div className="c-card-content">
          <Link to={`/article/${slug}`} className="black-text">
            <h5 className="">{title}</h5>
          </Link>
          <p className="description">
            <Link to={`/article/${slug}`} className="grey-t">
              {`${preview} ... `}
            </Link>
          </p>
          <div className="article-info">
            <p>
              <Link  id="author" to={`${ROUTES.profile}/${username}`}>
                {username}
              </Link>
            </p>
            <p className="grey-t">
              {new Date(created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              &nbsp;&nbsp;&nbsp;
              {
                <React.Fragment>
                  <span> &#9733;&nbsp; </span>
                  <span>{average_rating ? average_rating : "0"}</span>
                </React.Fragment>
              }
            </p>
          </div>
        </div>
      </div>
      <div className=" c-card-image">
        <Link to={`/article/${slug}`}>
          <img alt="" src={image} className="" />
        </Link>
      </div>
    </div>
  );
};

Articles.propTypes = {
  index: PropTypes.number.isRequired,
  article: PropTypes.shape().isRequired,
};

export default Articles;