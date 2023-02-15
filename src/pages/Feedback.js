import React, { Component } from 'react';
import './feedback.css';

class Feeback extends Component {
  render() {
    return (
      <div>
        <p
          data-testid="feedback-text"
          className="feedback-text"
        >
          Feedback
        </p>
      </div>
    );
  }
}

export default Feeback;
