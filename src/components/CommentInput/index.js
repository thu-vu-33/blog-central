import React from 'react';
import PropTypes from 'prop-types';

const CommentInput = ({
  type, name, label, onChange, handleSubmitComment, value, errors, failure,
}) => (
  <div className="comment-box">
    <form className="col s12" onSubmit={handleSubmitComment}>
      <div className="row">
        <div className="input-field col s12">
          <textarea
            type={type}
            name={name}
            className="materialize-textarea"
            onChange={onChange}
            value={value}
          />
          <label htmlFor={name}>{label}</label>
          {failure && <span className="green-text helper-text">{errors.errors[name]}</span>}
        </div>
        <div className="row">
          <button className="btn" type="submit">Publish</button>
        </div>
      </div>
    </form>
    <div className="row" />
  </div>
);

export default CommentInput;

CommentInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  handleSubmitComment: PropTypes.func,
  errors: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
  }),
  failure: PropTypes.bool,
};

CommentInput.defaultProps = {
  errors: null,
  failure: false,
};