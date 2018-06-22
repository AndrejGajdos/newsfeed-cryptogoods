import unionBy from 'lodash/unionBy';
import * as ActionTypes from '../constants/actionTypes';

const feeds = (state = {
  items: [],
  numberOfNewItems: 0,
}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_FEEDS_SUCCEEDED: {
      const newItems = unionBy(action.feeds, state.items, 'id');
      return {
        items: newItems,
        numberOfNewItems: newItems.length - state.items.length,
      };
    }
    default:
      return state;
  }
};

export default feeds;
