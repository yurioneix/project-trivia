import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderInfo from '../components/HeaderInfo';

class Game extends React.Component {
  render() {
    return (
      <div>
        <HeaderInfo />
      </div>
    );
  }
}

export default connect()(Game);
