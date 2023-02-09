import { NEW_PLAYER } from '../actions';

const INITIAL_STATE = {
  nome: '',
  email: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_PLAYER:
    return {
      ...state,
      nome: action.name,
      email: action.email,
    };
  default:
    return state;
  }
};

export default player;
