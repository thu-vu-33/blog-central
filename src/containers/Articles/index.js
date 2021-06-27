import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Article from '../../components/Article';
import Header from '../../components/Header';
import fetchArticleAction, { searchRequest } from '../Home/actions';
import { extractImage, extractDescription } from './filterArticles';
import ArticleLoader from '../../components/Placehoders/ArticleLoader';
import Paginator from '../../components/Pagination';
import config from '../../config';
import readTime from '../../utils/readtime';
import ROUTES from '../../utils/routes';

class Articles extends Component {
  constructor(props) {
    super(props);
    this.timeout = 0;
    this.loading = false;
    this.state = {
      activePage: 1,
      search: null,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const page = new URLSearchParams(location.search).get('page');
    const search = new URLSearchParams(location.search).get('search');

    if (page) {
      this.setState({ activePage: page });
    }
    this.setState({ search });
    this.props.fetchArticle(
      config.ARTICLES_PER_PAGE, page || this.state.activePage, this.state.search, this.props.type
    );
  }

  fetchFunc = (search, type) => {
    this.props.fetchArticle(
      config.ARTICLES_PER_PAGE, this.state.activePage, search, type
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.fetchFunc(e.target.value, this.props.type);
  }

  handleChange = (e) => {
    this.props.searchRequest();
    e.preventDefault();
    e.persist();
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.fetchFunc(e.target.value, this.props.type);
    }, 500);
  }

  renderNotFound = () => (
    <div className="row">
      <div className="col m8 s12 offset-m2">
        <div className="card card--auth p-b--40">
          <div className="card-content">
            <span className="card-title center-align text-primary brand m-b--30 m-t--15">
              OOP'S 404
            </span>
            <div className="center">
              <p className="centre-align">No Articles found matching your keywords.</p>
              <p className="m-t--15">Please search again.</p>
            </div>
          </div>
          <Link className="btn waves-effect waves-light btn--block" to={ROUTES.articles}>
            View All Artilces
          </Link>
        </div>
      </div>
    </div>
  );

  renderArticles = () => {
    const { results } = this.props.articles.payload;
    const articles = results.map((data) => {
      const image = data._image || "https://www.google.com/logos/doodles/2021/krzysztof-kieslowskis-80th-birthday-6753651837109260.5-l.png";
      const preview = data._preview || "Preview article";
      const readtime = data._readtime || 5;

      return (
        <Article
          title={data.title}
          date={data.created_at}
          slug={data.slug}
          preview={preview}
          image={image}
          author={data.author}
          key={data.slug}
          readtime={readtime}
          likesCount={data.likes_count}
        />
      );
    });
    if (articles.length === 0) {
      return this.renderNotFound();
    }
    return articles;
  }

  renderLoader = () => {
    const loaders = [];
    for (let index = 0; index <= 4; index += 1) {
      const loader = <ArticleLoader className="col m11 s12 preview" key={index} />;
      loaders.push(loader);
    }
    return loaders;
  }

  handlePageChange = (page) => {
    const activePage = page;
    this.setState({
      activePage,
    });
    this.props.fetchArticle(config.ARTICLES_PER_PAGE, page);
    window.scrollTo(0, 0);
  }

  renderStories = () => {
    const {
      isFetching, success,
    } = this.props.articles;
    return (
      <div className="row articles">
        <div className="col articles__main">
        <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Search ..."
              className="search"
              onChange={this.handleChange}
            />
          </form>
          {(isFetching || !success) ? this.renderLoader() : this.renderArticles()}
        </div>
      </div>
    );
  }

  render() {
    const { payload, isSearching } = this.props.articles;
    return (
      <div>
        <React.Fragment>
          <Header {...this.props} loading={isSearching} />
          <div className="container-fluid maxWidth1032">
            {this.renderStories()}
            {payload && (
              <Paginator
                activePage={this.state.activePage}
                total={payload.count}
                onClick={this.handlePageChange}
              />
            )}
          </div>
        </React.Fragment>
      </div>
    );
  }
}


Articles.propTypes = {
  articles: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    payload: PropTypes.object.isRequired,
    errors: PropTypes.object,
  }).isRequired,
  fetchArticle: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.object.isRequired,
  }),
};

const mapStateToProps = ({ articles }) => ({
  articles,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchArticle: fetchArticleAction,
    searchRequest,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Articles);