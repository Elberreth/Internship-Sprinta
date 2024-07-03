const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validateEmailFormat = (email) => {
  return emailRegex.test(email);
};

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,10}$/;

const validatePassword = (password) => {
  return passwordRegex.test(password);
};

export { validateEmailFormat, validatePassword };
