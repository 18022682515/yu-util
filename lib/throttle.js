const { getType } = require('./toObject.js');

function throttle (callback, ms) {
  ms = getType(ms, 'Number') ? ms : 0
  let date = 0

  return function (...args) {
    const now = Date.now()
    if (now - ms < date) return
    date = now
    getType(callback, 'Function') && callback.apply(this, args)
  }
}

module.exports = throttle
