require('./lib/toArray.js');
const { toModules } = require('./lib/toModule.js');
const { toJSON } = require('./lib/toJSON.js');
const { each,asyncEach,getType,copy,getFnNames } = require('./lib/toObject.js');

module.exports = { toModules, toJSON, each,asyncEach,getType,copy,getFnNames };

//{ each, asyncEach, getType, copy, getFnNames, toJSON,getModules }