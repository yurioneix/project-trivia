export const NEW_PLAYER = 'NEW_PLAYER';

export const loginInfo = (name, email) => ({
  type: NEW_PLAYER,
  name,
  email,
});
