// utils/validate.js
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  }
  module.exports = { isValidEmail };
  