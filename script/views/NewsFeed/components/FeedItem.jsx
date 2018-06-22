import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { DATE_FORMAT } from 'config';
import { SlideDown } from 'react-slidedown';
import { Tooltip } from 'react-tippy';
import { connect } from 'react-redux';
import { addLike } from 'actions/likes.actions';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import Likes from './Likes';
import './feedItem.scss';

class FeedItem extends Component {
  static propTypes = {
    comments: PropTypes.array,
    likes: PropTypes.array,
    addLike: PropTypes.func,
    winnerAccount: PropTypes.object,
    id: PropTypes.string,
    asset: PropTypes.object,
    price: PropTypes.string,
    date: PropTypes.string,
    userProfileName: PropTypes.string,
    userProfileImg: PropTypes.string,
  };

  static defaultProps = {
    comments: [],
    likes: [],
    addLike: () => null,
    winnerAccount: {},
    id: '',
    asset: {},
    price: '',
    date: '',
    userProfileImg: '',
    userProfileName: '',
  };

  state = {
    showComments: false,
    openLikesList: false,
    likeClicked: false,
  };

  clickLikeItem = () => {
    this.props.addLike({
      id: this.props.id,
      userProfileImg: this.props.winnerAccount.profile_img_url,
      userName: this.props.winnerAccount.address.substring(2, 8),
    });
    if (!this.state.likeClicked) {
      this.setState({ likeClicked: true, openLikesList: true });
    }
  };

  clickCommentItem = () => {
    this.setState({ showComments: !this.state.showComments });
  };

  mouseOverLikeItem = () => {
    if (this.props.likes.length) {
      clearTimeout(this.hoverTimeout);
      this.setState({ openLikesList: true });
    }
  };

  mouseOutLikes = () => {
    const that = this;
    this.hoverTimeout = setTimeout(() => {
      that.setState({ openLikesList: false });
    }, 300);
  };

  mouseOverLikeList = () => {
    clearTimeout(this.hoverTimeout);
    this.setState({ openLikesList: true });
  };

  render() {
    const {
      winnerAccount, asset, price, date, comments, likes, id, userProfileImg, userProfileName,
    } = this.props;
    const { showComments, openLikesList, likeClicked } = this.state;

    const commentItems = comments.map(item => <CommentItem comment={item} key={item.id} />);

    return (
      <li className="media FeedItem d-flex flex-column align-items-stretch rounded mt-3">
        <div className="FeedItem__Body d-flex align-items-center">
          <img
            className="m-3 rounded-circle"
            src={winnerAccount.profile_img_url}
            alt="Buyer profile"
            width="50"
            height="50"
          />
          <div className="media-body pr-3 py-3">
            <div className="DateLabel">
              <small>{moment(date).format(DATE_FORMAT)}</small>
            </div>
            <div>
              <span className="BuyerNameLabel">{winnerAccount.address.substring(2, 8)}</span> bought{' '}
              <span className="AssetNameLabel">{asset.name}</span> for {price}
            </div>
          </div>
        </div>
        <div className="FeedItem__Footer d-flex flex-row align-items-center align-content-stretch py-2">
          <div className="LikeContainer">
            <Tooltip
              position="top"
              trigger="manual"
              open={openLikesList}
              interactive
              html={
                <Likes
                  mouseOverLikeList={this.mouseOverLikeList}
                  mouseOutLikeList={this.mouseOutLikes}
                  id={id}
                  items={likes}
                  img={userProfileImg}
                  name={userProfileName}
                />
              }
              theme="light"
              animation="fade"
            >
              <div className="LikeLabelContainer">
                <span
                  className="LikeLabelContainer__Label d-flex align-items-center"
                  onClick={this.clickLikeItem}
                  onMouseOver={this.mouseOverLikeItem}
                  onMouseOut={this.mouseOutLikes}
                  role="button"
                  tabIndex={0}
                >
                  <i
                    className={cn({
                      'fa mx-1': true,
                      [`${likeClicked ? 'fa-heart red' : 'fa-heart-o'}`]: true,
                    })}
                  />
                  {likes.length > 0 ? `${likes.length}` : 'Like'}
                </span>
              </div>
            </Tooltip>
          </div>
          <div className="CommentLabelContainer">
            <span className="CommentLabelContainer__Label" onClick={this.clickCommentItem} role="button" tabIndex={0}>
              <i className="fa fa-comment-o mx-1" />
              {comments.length > 0 ? `${comments.length} ${comments.length > 1 ? 'Comments' : 'Comment'}` : 'Comment'}
            </span>
          </div>
        </div>
        <SlideDown in={showComments}>
          {showComments && (
            <div className="FeedItem__Comments">
              <CommentForm
                userName={winnerAccount.address.substring(2, 8)}
                id={id}
              />
              {commentItems}{' '}
            </div>
          )}
        </SlideDown>
      </li>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  comments: state.comments[ownProps.id],
  likes: state.likes[ownProps.id],
  userProfileImg: state.profile.img,
  userProfileName: state.profile.name,
});

const mapDispatchToProps = dispatch => ({
  addLike: likeObj => dispatch(addLike(likeObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedItem);
