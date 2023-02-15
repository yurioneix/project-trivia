import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import './header.css';

class HeaderInfo extends React.Component {
  render() {
    const { name, score, email } = this.props;
    const hash = MD5(email.toLowerCase()).toString();
    const API_GRAVATAR = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <header>
        <img
          className="profile-picture"
          data-testid="header-profile-picture"
          src={ API_GRAVATAR }
          alt={ `${name} avatar` }
        />
        <div className="info-container">
          <span
            data-testid="header-player-name"
            className="player-name"
          >
            { `PLAYER: ${name}` }
          </span>
          <span
            data-testid="header-score"
            className="player-score"
          >
            { `SCORE: ${score}` }
          </span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  score: player.score,
  email: player.email,
});

HeaderInfo.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(HeaderInfo);
