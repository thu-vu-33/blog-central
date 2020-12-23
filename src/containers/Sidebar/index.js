import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Trending from '../../components/Trending';
import fetchTrendingArticleAction from './actions';
import featured from '../../utils/featured';
import TrendingPlaceHolder from '../../components/Placehoders/TrendingPlaceHolder.js';


const Tags = () => (
  <React.Fragment>
    <div className="trending__article">
      <h2 className="ui-h2">Hot topics</h2>
    </div>
    <div className="row">
      <div className="chip">Hyper Loop</div>
      <div className="chip">Quantum computing</div>
      <div className="chip">Alien technology</div>
      <div className="chip">Technology</div>
      <div className="chip">Music</div>

    </div>
  </React.Fragment>
);


class SideBar extends Component {
  componentDidMount() {
    this.props.fetchArticle(30);
  }

  renderArticles = () => {
    const { results } = this.props.articles.payload;
    const featuredArticles = featured(results).filter(a => a !== false).slice(0, 3);
    return (
      <React.Fragment>
        {featuredArticles.map((article, i) => {
          return <Trending article={article} index={i} key={i} />;
        })}
      </React.Fragment>
    );
  }

  renderTrendingPlaceholder = () => {
    const loaders = [];
    for (let index = 0; index < 5; index += 1) {
      const loader = (
        <TrendingPlaceHolder index={index} key={index}/>
        );
        loaders.push(loader);
      }
      return loaders;
  }

  render() {
    const { isFetching, success } = this.props.articles;
    return (
      <aside className="col l4 m12 s12 articles__sidebar">
        <div className="network center">
           <Tags />
        </div>

        <div className="divider" />
        <div className="trending__article">
          <h2 className="ui-h2">Popular:</h2>
        </div>
        {isFetching || !success ? this.renderTrendingPlaceholder() : this.renderArticles() }
        <div className="divider" />

        {/* <div className="trending p-b--10">
          <div className="trending__article">
            <h2 className="ui-h2">Recommended for you: </h2>
          </div>
        </div>
        <div className="divider" /> */}
      </aside>
    );
  }
}

SideBar.propTypes = {
  page: PropTypes.string,
  articles: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    payload: PropTypes.object.isRequired,
    errors: PropTypes.object,
  }).isRequired,
  fetchArticle: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchArticle: fetchTrendingArticleAction,
  },
  dispatch,
);

const mapStateToProps = ({ trending }) => ({
  articles: trending,
});


export default connect(mapStateToProps, mapDispatchToProps)(SideBar);