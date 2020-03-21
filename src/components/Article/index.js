import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthorDetails from '../AuthorDetails';


const Article = ({
  title, author, image, date, slug, readtime,
}) => (
  <div className="col m11 s12 preview">
    <div className="row author">
      <AuthorDetails user={author} date={date} readtime={readtime} small slug={slug} />
    </div>
    {image && (
      <Link to={`article/${slug}`} className="black-text">
        <div className="row article__image">
          <img alt="" src={image} className="responsive-img article__preview" />
        </div>

      </Link>)
    }
    <div className="row article__details">
      <Link to={`article/${slug}`} className="black-text">
        <h2 className="article__preview--title">{title}</h2>
      </Link>
    </div>
  </div>
);


Article.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  readtime: PropTypes.number,
};

export default Article;