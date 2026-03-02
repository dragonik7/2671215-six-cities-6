const TOKEN_KEY = 'six-cities-token';

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const dropToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
