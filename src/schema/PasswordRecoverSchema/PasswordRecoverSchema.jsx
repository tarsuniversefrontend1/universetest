const PasswordRecoverSchema = (password, retypePassword) => {
  const errors = {};

  if (password.length < 8) {
    errors.length = "Password must be at least 8 characters long.";
  }

  if (!/[A-Z]/.test(password)) {
    errors.capital = "Password must contain at least one uppercase letter.";
  }

  if (!/\d/.test(password)) {
    errors.number = "Password must contain at least one number.";
  }

  if (!/[!@#$%^&*]/.test(password)) {
    errors.special = "Password must contain at least one special character.";
  }

  if (password !== retypePassword) {
    errors.match = "Passwords do not match.";
  }

  return errors;
};

export default PasswordRecoverSchema;
