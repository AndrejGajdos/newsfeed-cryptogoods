import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './likes.scss';

export default class Likes extends Component {
  static propTypes = {
    items: PropTypes.array,
    mouseOverLikeList: PropTypes.func,
    mouseOutLikeList: PropTypes.func,
    name: PropTypes.string,
    img: PropTypes.string,
  };

  static defaultProps = {
    items: [],
    name: '',
    img: '',
    mouseOverLikeList: () => null,
    mouseOutLikeList: () => null,
  };

  mouseOverLikeList = () => {
    this.props.mouseOverLikeList();
  };

  mouseOutLikeList = () => {
    this.props.mouseOutLikeList();
  };

  render() {
    const { items, name, img } = this.props;
    const listItems = items.map(item => (
      <li className="pr-4 mb-2" key={item.id}>
        <img
          className="rounded-circle mr-1"
          src={img}
          alt="Generic placeholder"
          width="20"
          height="20"
        />
        <span className="UserNameLabel">{name}</span>
      </li>
    ));

    return (
      <ul
        className="list-unstyled mb-0 LikesList"
        onMouseOver={this.mouseOverLikeList}
        onFocus={this.mouseOverLikeList}
        onMouseOut={this.mouseOutLikeList}
        onBlur={this.mouseOutLikeList}
      >
        {listItems}
      </ul>
    );
  }
}
