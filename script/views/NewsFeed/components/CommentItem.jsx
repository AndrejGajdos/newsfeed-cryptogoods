import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TextareaAutosize from 'react-autosize-textarea';
import { DATE_FORMAT } from 'config';
import './comments.scss';

export default class CommentItem extends Component {
  static propTypes = {
    comment: PropTypes.object,
  };

  static defaultProps = {
    comment: {},
  };

  state = { value: this.props.comment.text };

  componentWillReceiveProps(nextProps) {
    if (this.props.comment.text !== nextProps.comment.text) {
      this.setState({ value: nextProps.comment.text });
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { comment } = this.props;
    const { value } = this.state;
    return (
      <div className="CommentContainer CommentItem d-flex flex-row">
        <img
          className="mx-3 rounded-circle"
          src={comment.userProfileImg}
          alt="User"
          width="50"
          height="50"
        />
        <div className="CommentContainer__FormContainer FormCommentItem mr-4">
          <form>
            <div className="FormCommentItem__FormWrapper FormWrapper form-group mb-0 rounded">
              <span className="FormWrapper__Label d-flex flex-row mb-0 pl-3 pt-2">
                <small className="LabelWrapper d-flex flex-row">
                  <span className="BuyerNameLabel pr-2">{comment.userName}</span>
                  <span className="AssetDateLabel">{moment(comment.date).format(DATE_FORMAT)}</span>
                </small>
              </span>
              <TextareaAutosize
                className="CommentInput form-control px-3 pb-2 pt-0 mt-0 mb-3"
                id="commentTextArea"
                placeholder="Write a comment..."
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
