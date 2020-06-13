require('./lib/toArray.js');

const attributeObserver = require('./lib/attributeObserver.js');
const { getType,copy } = require('./lib/toObject.js');
const { toJSON } = require('./lib/toJSON.js');

module.exports = { attributeObserver, copy, getType, toJSON };