export const fetchToken = async () => {
  try {
    const response = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const result = await response.json();
    localStorage.setItem('token', result.token);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const fetchTrivia = async (token) => {
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    if (!response.ok) {
      throw new Error('deu ruim');
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
