/**
 * Debouncer
 * @param {Function} fn - Callback function
 * @param {*} delay - Delay in ms
 * @returns {Function}
 */
const debounce = (fn, delay = 100) => {
  let timeoutId
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.apply(null, args)
    }, delay)
  }
}

// Symbols
const openSuccessPopup = Symbol('openSuccessPopup')
const popupCloseKey = Symbol('popupCloseKey')
const formKey = Symbol('formKey')

// Open

export {
  formKey,
  popupCloseKey,
  openSuccessPopup,
  debounce
}
