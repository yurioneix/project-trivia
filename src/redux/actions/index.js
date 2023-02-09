export const NEW_PLAYER = 'NEW_PALYER';

export const loginInfo = (nome, email) => ({
  type: NEW_PLAYER,
  nome,
  email,
});
