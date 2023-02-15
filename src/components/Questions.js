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
    nextQuestion: false,
  };

  componentDidMount() {
    this.getQuestionsData();
    this.setQuestionsTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClass = (answer) => {
    this.setState({
      isChoosed: true,
      nextQuestion: true,
    });
    const { questions, questionIndex, timer } = this.state;
    console.log(questions);
    console.log(questionIndex);
    const { dispatch, score } = this.props;
    let sum = 0;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    const ten = 10;

    if (questions[questionIndex].difficulty === 'easy'
    && questions[questionIndex].correct_answer === answer) {
      sum = ten + (timer * easy);
      dispatch(newScore(sum));

      return sum;
    }
    if (questions[questionIndex].difficulty === 'medium'
    && questions[questionIndex].correct_answer === answer) {
      sum = ten + (timer * medium);
      dispatch(newScore(sum));

      return sum;
    }
    if (questions[questionIndex].difficulty === 'hard'
    && questions[questionIndex].correct_answer === answer) {
      sum = ten + (timer * hard);
      dispatch(newScore(sum));
      return sum;
    }

    // dispatch(newScore(sum));

    return score;
  };

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
    // console.log('Perguntas completas', questionsResult);
    // console.log('Pergunta única', oneQuestion);
    // console.log('getquestion', questionIndex);
    const questionsAnswers = [
      ...oneQuestion.incorrect_answers,
      oneQuestion.correct_answer,
    ];
    // console.log(questionsAnswers);
    const result = this.sortingQuestions(questionsAnswers);
    this.setState({
      answers: result,
      loading: false,
      questions: questionsResult.results,
    });

    // console.log('Getquestion answers', answers);
    // console.log('Getquestion questions', questions);
  };

  sortingQuestions = (questions) => {
    // console.log('sorting questions', questions);
    const sortIndex = 0.5;
    const sortedAnswers = questions.sort(() => Math.random() - sortIndex);
    // console.log(sortedAnswers);
    return sortedAnswers;
  };

  handleNextQuestion = () => {
    const { questionIndex, questions } = this.state;
    // this.getQuestionsData();
    console.log(questionIndex);
    const count = questionIndex + 1;
    const questionsAnswers = [
      ...questions[count].incorrect_answers,
      questions[count].correct_answer,
    ];
    // console.log(questionsAnswers);

    // console.log('handleNext question', questions);
    // console.log(this.sortingQuestions(questionsAnswers));
    // const lastAnswer = 5;
    if (count === questions.length - 1) {
      const { history } = this.props;
      history.push('/feedback');
    }
    this.setState({
      answers: this.sortingQuestions(questionsAnswers),
      questionIndex: count,
      isChoosed: false,
      timer: 30,
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
      isDisabled,
      nextQuestion,
    } = this.state;
    // console.log('render', questionIndex);
    // console.log('Render answers', answers);
    // console.log('Render questions', questions);
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
            {answers?.map((answer, index) => (
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
            { nextQuestion
            && (
              <button
                onClick={ this.handleNextQuestion }
                type="button"
                data-testid="btn-next"
              >
                Next
              </button>)}
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
