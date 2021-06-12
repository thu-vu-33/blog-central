import Dante from 'Dante2';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import M from 'materialize-css';
import ReactAudioPlayer from 'react-audio-player';

import thumbsUp from '../../../assets/icons/thumbsUp.svg';
import thumbsDown from '../../../assets/icons/thumbsDown.svg';

import {
  fetchArticle, rateSuccess, likeArticle, dislikeArticle,
} from './actions';
import Reaction from '../../../components/LikeDislike';
import Header from '../../../components/Header';
import AuthorDetails from '../../../components/AuthorDetails';
import ArticleDetailsLoader from '../../../components/Placehoders/ArticleDetailsLoader'
import NotFound from '../../../components/NotFound';
import api from '../../../utils/api';
import getCurrentUser from '../../../utils/auth';
import readTime from '../../../utils/readtime';
import NewComment from '../../Comments/Create';
import ReadComments from '../../Comments/Read';
import Tiptap from './Tiptap.js'

const user = getCurrentUser();

class Read extends Component {
  state = {
    rating: 0,
    alert: false,
    alertClass: 'success',
    alertMessage: '',
  };

  componentDidMount() {
    const { getArticle, match } = this.props;
    getArticle(match.params.id);
  }

  toaster = () => {
    M.toast({ html: this.state.alertMessage, className: this.state.alertClass });
  }

  onStarClick = (nextValue) => {
    this.setState({ rating: nextValue });
    const rateData = {
      rate: {
        rate: nextValue,
      },
    };
    if (user) {
      this.setState({ alert: false });
      api({
        endpoint: `/articles/${this.props.match.params.id}/rate/`,
        method: 'POST',
        data: rateData,
        authenticated: true,
      })
      .then(() => {
        const { getRating, getArticle, match } = this.props;
        getRating();
        getArticle(match.params.id);
      })
      .catch((err) => {
        this.setState({
          alert: true,
          alertMessage: err.rate.errors.message[0],
          alertClass: 'danger',
        });
      });
  } else {
    this.setState({
      alert: true,
      alertMessage: 'Please Login to rate this article',
      alertClass: 'danger',
    });
  }
};

handleReaction = (e) => {
  e.preventDefault();
  const { like, dislike, match } = this.props;
  if (user) {
    this.setState({ alert: false });
    if (e.target.id === 'like') {
      like(match.params.id);
    } else if (e.target.id === 'dislike') {
      dislike(match.params.id);
    }
  } else {
    this.setState({
      alert: true,
      alertMessage: 'Please Login to like or dislike this article',
      alertClass: 'danger',
    });
  }
};

renderReaction = (id, src, count) => (
  <Reaction id={id} src={src} count={count} onClick={this.handleReaction} />
);

renderTags = tags => tags.map(tag => <div className="chip">{tag}</div>);

renderComments = () => {
  const user = getCurrentUser();
  if (user) {
    return (
      <div>
        <NewComment slug={this.props.match.params.id} />
        <ReadComments slug={this.props.match.params.id} />
      </div>
    );
  }
  return null;
}

  render() {
    const {
      isFetching, success, payload, errors, isRating,
    } = this.props.article;
    let data;
    let readtime;
    if (payload.article) {
      try {
        data = payload.article.body;
        // readtime = readTime(data);
      } catch (e) {
        return <NotFound />;
      }
    }

    if (errors) {
      return <NotFound />;
    }
    return (
      <React.Fragment>
        <Header />

        <div className="container s12 maxWidth1032">
          <div className="row">
          {this.state.alert ? this.toaster() : ''}
            {(isFetching || !success) && !isRating ? (
              <ArticleDetailsLoader />
            ) : (
              <React.Fragment>
                <div className="col l11 s12">
                  <AuthorDetails
                    user={{ ...payload.article.author }}
                    date={payload.article.created_at}
                    slug={payload.article.slug}
                    // readtime={readtime}
                    averageRate={
                      payload.article.average_rating
                      ? parseFloat(payload.article.average_rating)
                        : this.state.rating
                    }
                    onStarClick={this.onStarClick}
                  />
                  {/* <Dante read_only content={data} /> */}
                  <ReactAudioPlayer src="https://dl.dropboxusercontent.com/s/zxbf0yz8vga0qug/Test%203%20Part%201.mp3?dl=0" autoPlay controls />
                  <Tiptap content={data}/>
                  {this.renderComments()}
                  </div>
                <div className="col l1 s1 hide-on-med-and-down">
                  <div className="reactions">
                    {this.renderReaction('like', thumbsUp, payload.article.likes_count)}
                    {this.renderReaction('dislike', thumbsDown, payload.article.dislikes_count)}
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
          {payload.article && <div className="row">{ this.renderTags(payload.article.tagList) }</div>}
        </div>
      </React.Fragment>
    );
  }
}

Read.propTypes = {
  article: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    isRating: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    failure: PropTypes.bool.isRequired,
    payload: PropTypes.object.isRequired,
    errors: PropTypes.object,
  }).isRequired,
  getArticle: PropTypes.func.isRequired,
  getRating: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  bookmark: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getArticle: fetchArticle,
    getRating: rateSuccess,
    like: likeArticle,
    dislike: dislikeArticle,
  },
  dispatch,
);

const mapStateToProps = state => ({
  article: state.fetchArticle,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Read);
