import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTrivia } from '../services';
import '../pages/game.css';

class Questions extends Component {
  state = {
    questions: [],
    questionIndex: 0,
    answers: [],
    loading: true,
    isChoosed: false,
    timer: 30,
    isDisabled: false,
  };

  componentDidMount() {
    this.getQuestionsData();
    this.setQuestionsTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  scoreboard = (sec, difficulty) => {
    let sum = 0;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    const ten = 10;
    if (difficulty === 'easy') {
      sum = ten + (sec * easy);
      return sum;
    }
    if (difficulty === 'medium') {
      sum = ten + (sec * medium);
      return sum;
    }
    if (difficulty === 'hard') {
      sum = ten + (sec * hard);
      return sum;
    }
  };

  handleClass = (event) => {
    // const { timer } = this.state;
    this.setState({ isChoosed: true });
    // this.scoreRecorder(event.target.innerText, timer);
  };

  // scoreRecorder = (answer, sec) => {
  //   const { answers } = this.state;
  //   const index = 0;
  //   const perguntaAtual = answers[index];
  //   const state = this.getLocalStorage();

  //   if (answer === perguntaAtual.correct_answer) {
  //     state.player.assertions += 1;
  //     state.player.score += this.scoreboard(sec, perguntaAtual.difficulty);
  //     return localStorage.setItem('state', JSON.stringify(state));
  //   }
  // };

  setQuestionsTimer = () => {
    const oneSec = 1000;
    this.interval = setInterval(() => {
      const { timer } = this.state;
      this.setState({ timer: timer - 1 });
      if (timer === 0) {
        clearInterval(this.interval);
        this.setState({ isDisabled: true });
      }
    }, oneSec);
  };

  getQuestionsData = async () => {
    const { questionIndex } = this.state;
    const storageToken = localStorage.getItem('token');

    const questionsResult = await fetchTrivia(storageToken);
    const errorCode = 3;

    if (questionsResult?.response_code === errorCode) {
      const { history } = this.props;
      localStorage.removeItem('token');
      return history.push('/');
    }

    const oneQuestion = questionsResult.results[questionIndex];
    const questionsAnswers = [
      ...oneQuestion.incorrect_answers,
      oneQuestion.correct_answer,
    ];
    const sortIndex = 0.5;
    const sortedAnswers = questionsAnswers.sort(() => Math.random() - sortIndex);
    this.setState({
      answers: sortedAnswers,
      loading: false,
      questions: questionsResult.results,
    });
  };

  handleNextQuestion = () => {
    const { questionIndex } = this.state;
    this.setState({
      questionIndex: questionIndex + 1,
    });
  };

  render() {
    const {
      questions,
      answers,
      questionIndex,
      loading,
      isChoosed,
      timer,
      isDisabled } = this.state;

    return (
      loading ? <span>loading...</span> : (
        <section>
          <p>{timer}</p>
          <div className="question-container">
            <h1 data-testid="question-category">{questions[questionIndex].category}</h1>
            <h2 data-testid="question-text">{questions[questionIndex].question}</h2>
          </div>
          <div
            className="answers-container"
            data-testid="answer-options"
          >
            {answers.map((answer, index) => (
              <button
                key={ `answer-${index + 1}` }
                disabled={ isDisabled }
                data-testid={ answer === questions[questionIndex].correct_answer
                  ? 'correct-answer' : `wrong-answer-${index}` }
                className={ isChoosed
                  && (questions[questionIndex].correct_answer === answer
                    ? 'correct-answer' : 'wrong-answer') }
                onClick={ this.handleClass }
              >
                { answer }
              </button>
            ))}
          </div>
          <div className="next-question-btn">
            <button
              onClick={ this.handleNextQuestion }
              type="button"
            >
              Next
            </button>
          </div>
        </section>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
});

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Questions);
