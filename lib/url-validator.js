const isUrl = require('is-url-superb');

function urlValidator(value) {
  if (!isUrl(value) || !value.includes('://')) { // 2-e условие позволяет отсечь конструкции типа http:ya.ru
    throw new Error('Invalid URL');
  }

  return value;
}

module.exports = urlValidator;
