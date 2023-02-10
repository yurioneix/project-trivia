import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class HeaderInfo extends React.Component {
  render() {
    const { name, score, email } = this.props;
    const hash = MD5(email.toLowerCase()).toString();
    const API_GRAVATAR = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ API_GRAVATAR }
          alt={ `${name} avatar` }
        />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
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
