import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import '../App.css';

class Login extends Component {
  constructor(state) {
    super(state);
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    const { name, email } = this.state;

    if (name.length > 0 && email.length > 0) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header>
        <div>
          <input
            data-testid="input-player-name"
            name="name"
            type="text"
            placeholder="Place your name here"
            value={ name }
            onChange={ this.handleChange }
          />
          <input
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            placeholder="Place your email here"
            value={ email }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
          >
            Play
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
