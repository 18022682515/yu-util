require('./lib/toArray.js');
const { toJSON } = require('./lib/toJSON.js');
const { each,asyncEach,getType,copy,getFnNames } = require('./lib/toObject.js');
const attributeObserver = require('./lib/attributeObserver.js');

module.exports = { copy, getFnNames, getType, each, asyncEach, toJSON,attributeObserver };