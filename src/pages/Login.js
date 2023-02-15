import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import { loginInfo, fetchNewGameToken } from '../redux/actions';
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

  // handleClick = () => {
  //   const { history } = this.props;

  //   history.push('/settings');
  // };

  startGame = async () => {
    const { name, email } = this.state;
    const { playerInfo, newGame, history } = this.props;

    playerInfo(name, email);
    await newGame();

    history.push('/game');
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div className="login-container">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p className="login-message">YOUR TURN!</p>
        </header>
        <div className="inputs-container">
          <input
            className="input-name"
            data-testid="input-player-name"
            name="name"
            type="text"
            placeholder="Place your name here"
            value={ name }
            onChange={ this.handleChange }
          />
          <input
            className="input-email"
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            placeholder="Place your email here"
            value={ email }
            onChange={ this.handleChange }
          />
          {/* <Link to="/game"> */}
          <button
            className="btn-play"
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.startGame }
          >
            Play
          </button>
          {/* </Link> */}
          <Link to="/settings">
            <button
              className="btn-settings"
              data-testid="btn-settings"
              type="button"
            >
              Configurações
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  playerInfo: (name, email) => dispatch(loginInfo(name, email)),
  newGame: () => dispatch(fetchNewGameToken()),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  playerInfo: PropTypes.func.isRequired,
  newGame: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
