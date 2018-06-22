import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from 'actions/comments.actions';
import './comments.scss';

class CommentForm extends Component {
  static propTypes = {
    addComment: PropTypes.func,
    userProfileImg: PropTypes.string,
    userName: PropTypes.string,
    id: PropTypes.string,
  };

  static defaultProps = {
    addComment: () => null,
    userProfileImg: '',
    userName: '',
    id: '',
  };

  state = { value: '' };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.addComment({
        userProfileImg: this.props.userProfileImg,
        text: this.textarea.value,
        userName: this.props.userName,
        id: this.props.id,
        date: new Date(),
      });
      event.preventDefault();
      this.setState({ value: '' });
    }
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { value } = this.state;
    const { userProfileImg } = this.props;
    return (
      <div className="CommentContainer d-flex flex-row">
        <img
          className="CommentContainer__ProfileImg m-3 rounded-circle"
          src={userProfileImg}
          alt="Profile comment"
          width="50"
          height="50"
        />
        <div className="CommentContainer__FormContainer mr-4 mt-4">
          <form>
            <div className="form-group">
              <textarea
                className="CommentInput form-control p-3"
                id="commentTextArea"
                rows="1"
                placeholder="Write a comment..."
                onKeyPress={this.handleKeyPress}
                ref={el => (this.textarea = el)}
                onChange={this.handleChange}
                value={value}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userProfileImg: state.profile.img,
});

const mapDispatchToProps = dispatch => ({
  addComment: commentObj => dispatch(addComment(commentObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
