import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderInfo from '../components/HeaderInfo';
import Questions from '../components/Questions';

class Game extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <HeaderInfo />
        <Questions history={ history } />
      </div>
    );
  }
}

export default connect()(Game);
