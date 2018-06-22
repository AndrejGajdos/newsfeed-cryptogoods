import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { toast } from 'react-toastify';
import FeedItem from './components/FeedItem';
import './NewsFeed.scss';

class NewsFeed extends Component {
  static propTypes = {
    feeds: PropTypes.array,
    numberOfNewItems: PropTypes.number,
  };

  static defaultProps = {
    feeds: [],
    numberOfNewItems: 0,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.numberOfNewItems) {
      toast.info(`${nextProps.numberOfNewItems} new transactions were processed`);
    }
  }

  render() {
    const { feeds } = this.props;
    return (
      <div className="container">
        <div className="row col-lg-10 mx-auto">
          <div className="FeedList list-group mt-3 mx-auto px-1">
            <h5 className="mb-0">Activity Stream</h5>
            <ul className="list-unstyled">
              <TransitionGroup>
                {feeds.map(feedItem => (
                  <CSSTransition key={feedItem.id} timeout={500} classNames="FeedItemAnim">
                    <FeedItem
                      winnerAccount={feedItem.winner_account}
                      asset={feedItem.asset}
                      price={feedItem.total_price}
                      date={feedItem.modified_date}
                      key={feedItem.id}
                      id={feedItem.id}
                    />
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feeds: state.feeds.items,
  numberOfNewItems: state.feeds.numberOfNewItems,
});

export default connect(mapStateToProps, null)(NewsFeed);
