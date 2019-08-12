require('./lib/toArray.js');
const { toJSON } = require('./lib/toJSON.js');
const { each,asyncEach,getType,copy,getFnNames } = require('./lib/toObject.js');

module.exports = { copy, getFnNames, getType, each, asyncEach, toJSON };

//{ copy, getFnNames, getType, each, asyncEach, toJSON }