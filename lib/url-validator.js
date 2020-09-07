function urlValidator(value = '') {
  try {
    const url = new URL(value);
    if (!url.hostname.includes('.') || !value.includes('://')) {
      // 1-е условие позволит отсечь ссылки типа http://link
      // 2-e условие позволяет отсечь конструкции типа http:ya.ru
      throw new Error();
    }

    return value;
  } catch {
    throw new Error('Invalid URL');
  }
}

module.exports = urlValidator;
