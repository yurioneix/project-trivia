import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchTrivia } from '../services';

class Questions extends Component {
  state = {
    questions: [],
    section: '',
    isSelected: false,
    perguntaAtual: 0,
    answer: [],
  };

  async componentDidMount() {
    const storageToken = localStorage.getItem('token');
    const questionsResult = await fetchTrivia(storageToken);
    // console.log(questionsResult.results);
    const number = 0;
    if (questionsResult.response_code === number) {
      this.setState({
        questions: questionsResult.results,
      });
    } else {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  // handleClick = () => {

  // }

  fillAnswers = (correct, incorrect) => {
    const correctAnswer = (
      <button
        data-testid="correct-answer"
        type="button"
      >
        {correct}

      </button>
    );
    const incorrectAnswer = incorrect.map((answer, index) => (
      <button
        key={ index }
        data-testid={ `wrong-answer-${index}` }
      >
        {answer}

      </button>
    ));
    const nmrCinco = 5;
    const randomIndex = Math.floor(Math.random() * nmrCinco);
    incorrectAnswer.splice(randomIndex, 0, correctAnswer);
    return incorrectAnswer;
  };

  render() {
    const { questions, perguntaAtual } = this.state;
    // console.log(questions);
    // const {
    //   category,
    //   question,
    //   correct_answer: correct,
    //   incorrect_answers: incorrect,
    // } = questions[perguntaAtual];
    // console.log(questions[perguntaAtual]);
    // const onlyAnswers = [questions[perguntaAtual].correct_answer, ...questions[perguntaAtual].incorrect_answers];
    // console.log(onlyAnswers);
    return (
      <div>

        { questions.length > 0 && questions.map((question, index) => (
          <div key={ index }>
            <h2 data-testid="question-category">
              {question.category}
            </h2>
            <p data-testid="question-text">
              {question.question}
            </p>
            <div data-testid="answer-options">
              {this.fillAnswers(
                question.correct_answer,
                question.incorrect_answers,
              )}
            </div>

          </div>
        ))}
        ;

      </div>
    );
  }
}
Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Questions;
