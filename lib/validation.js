export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isAtMostLength(value, maxLength) {
  return value.length <= maxLength;
}

export function hasLetter(value) {
  return /[A-Za-z]/.test(value);
}

export function hasNumber(value) {
  return /\d/.test(value);
}

export function hasSpecialChar(value) {
  return /[@$!%*?&_\-+.#]/.test(value);
}

export function isEqual(value1, value2) {
  return value1 === value2;
}

export function isEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}
