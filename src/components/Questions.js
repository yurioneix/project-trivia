import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchTrivia } from '../services';

class Questions extends Component {
  state = {
    questions: [],
    questionIndex: 0,
    answers: [],
    loading: true,
  };

  componentDidMount() {
    this.getQuestionsData();
  }

  getQuestionsData = async () => {
    const { questionIndex } = this.state;
    const storageToken = localStorage.getItem('token');
    const questionsResult = await fetchTrivia(storageToken);
    const errorCode = 3;
    if (!questionsResult || questionsResult.response_code === errorCode) {
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

  // handleClick = () => {
  //   const { questionIndex } = this.state;
  //   this.setState({
  //     questionIndex: questionIndex + 1,
  //   });
  // };

  render() {
    const { questions, answers, questionIndex, loading } = this.state;

    return (
      loading ? <span>loading...</span> : (
        <div>
          <h1 data-testid="question-category">{questions[questionIndex].category}</h1>
          <h2 data-testid="question-text">{questions[questionIndex].question}</h2>
          <div data-testid="answer-options">
            {answers.map((answer, index) => (
              <button
                key={ `answer-${index + 1}` }
                data-testid={ answer === questions[questionIndex].correct_answer
                  ? 'correct-answer' : `wrong-answer-${index}` }
              >
                { answer }
              </button>
            ))}
          </div>
        </div>
      )
    );
  }
}
Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Questions;
