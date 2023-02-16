import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import './feedback.css';

class Feedback extends Component {
  render() {
    const { name, score, email } = this.props;
    const hash = MD5(email.toLowerCase()).toString();
    const API_GRAVATAR = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <section>
        <div className="feedback-page">
          <h1
            data-testid="feedback-text"
            className="feedback-text"
          >
            Feedback
          </h1>
          <div className="feedback-info-container">
            <img
              src={ API_GRAVATAR }
              data-testid="header-profile-picture"
              alt="gravatar-profile"
            />
            <h2
              data-testid="header-player-name"
              className="player-name"
            >
              { name }
            </h2>
            <h2
              data-testid="header-score"
              className="player-score"
            >
              { score }
            </h2>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  score: player.score,
  email: player.email,
});

Feedback.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
