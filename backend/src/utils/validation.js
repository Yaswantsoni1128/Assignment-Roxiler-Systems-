export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password) => {
  // 8-16 chars, 1 uppercase, 1 special char
  if (password.length < 8 || password.length > 16) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
  return true;
};

export const validateName = (name) => {
  // Min 20, max 60 (as per assignment, though 20 is a high minimum, we follow requirements)
  return name.length >= 20 && name.length <= 60;
};

export const validateAddress = (address) => {
  return address.length <= 400;
};
