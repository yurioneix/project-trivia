import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTrivia } from '../services';
import '../pages/game.css';
import { newScore } from '../redux/actions';

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

  // scoreboard = () => {
  //   const { questions, questionIndex, timer } = this.state;
  //   let sum = 0;
  //   const easy = 1;
  //   const medium = 2;
  //   const hard = 3;
  //   const ten = 10;
  //   if (questions[questionIndex].difficulty === 'easy') {
  //     sum = ten + (timer * easy);
  //     return sum;
  //   }
  //   if (questions[questionIndex].difficulty === 'medium') {
  //     sum = ten + (timer * medium);
  //     return sum;
  //   }
  //   if (questions[questionIndex].difficulty === 'hard') {
  //     sum = ten + (this.setQuestionsTimer * hard);
  //     return sum;
  //   }
  //   newScore(sum);
  //   console.log(sum);
  // };

  handleClass = (answer) => {
    // const { timer } = this.state;
    this.setState({ isChoosed: true });
    const { questions, questionIndex, timer } = this.state;
    const { dispatch, score } = this.props;
    console.log(typeof score);
    let sum = 0;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    const ten = 10;

    if (questions[questionIndex].difficulty === 'easy'
    && questions[questionIndex].correct_answer === answer) {
      sum = ten + (timer * easy);
      console.log('Timer easy', timer);
      console.log('Sum easy', sum);
      dispatch(newScore(sum));

      return sum;
    }
    if (questions[questionIndex].difficulty === 'medium'
    && questions[questionIndex].correct_answer === answer) {
      sum = ten + (timer * medium);
      console.log('Timer medium', timer);
      console.log('Sum medium', sum);
      dispatch(newScore(sum));

      return sum;
    }
    if (questions[questionIndex].difficulty === 'hard'
    && questions[questionIndex].correct_answer === answer) {
      sum = ten + (timer * hard);
      console.log('Timer hard', timer);
      console.log('Sum hard', sum);
      dispatch(newScore(sum));
      return sum;
    }
    // else {
    dispatch(newScore(sum));
    console.log('Sum fora do if', sum);
    //   console.log('resposta errada');
    return score;
    // }

    // this.scoreboard();
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
                onClick={ () => this.handleClass(answer) }
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
  score: state.player.score,
});

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Questions);
