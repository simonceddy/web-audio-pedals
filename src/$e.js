/**
 * shorthand wrapper for document.createElement
 * @param {*} name element name
 * @returns {HTMLElement}
 */
export function $el(name) {
  return document.createElement(name);
}

/**
 * shorthand wrapper for document.querySelector
 * @param {string} selector Element identifier
 */
export function $e(selector) {
  return document.querySelector(selector);
}
