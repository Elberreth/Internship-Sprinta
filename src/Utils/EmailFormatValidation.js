const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validateEmailFormat = (email) => {
  return emailRegex.test(email);
};

export default validateEmailFormat;
