import { fetchToken } from '../../services';

export const NEW_PLAYER = 'NEW_PLAYER';
export const NEW_GAME = 'NEW_GAME';

export const loginInfo = (name, email) => ({
  type: NEW_PLAYER,
  name,
  email,
});

const newToken = (token) => ({
  type: NEW_GAME,
  token,
});

export const fetchNewGameToken = () => async (dispatch) => {
  const newGame = await fetchToken();
  return dispatch(newToken(newGame));
};
