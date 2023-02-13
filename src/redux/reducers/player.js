import { NEW_PLAYER, NEW_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
  case NEW_PLAYER:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case NEW_SCORE:
    return {
      ...state,
      score: action.score,
    };
  default:
    return state;
  }
};

export default player;
