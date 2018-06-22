import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.scss';

function Header(props) {
  const { profileImg, name } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light Site-header">
      <a className="navbar-brand" href="#">
        Newsfeed CryptoGoods
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1" />
      <div className="navbar-signed d-flex">
        <style
          dangerouslySetInnerHTML={{
            __html: [
              '.img-profile {',
              `  background-image: url(${profileImg});`,
              `  background-size: 30px auto`,
              '}',
            ].join('\n'),
          }}
        />
        <div className="img-profile mr-2 rounded-circle" />
        <div className="dropdown profile-label d-flex align-items-center">
          <span>
            {name}
          </span>
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  profileImg: PropTypes.string,
  name: PropTypes.string,
};

Header.defaultProps = {
  profileImg: '',
  name: '',
};

const mapStateToProps = state => ({
  name: state.profile.name,
  profileImg: state.profile.img,
});

export default connect(mapStateToProps, null)(Header);
