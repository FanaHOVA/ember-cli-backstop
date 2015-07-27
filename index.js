/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-cli-backstop',

	blueprintsPath: function() {
		return path.join(__dirname, 'blueprints');
	},

  includedCommands: function () {
    return {
      'backstop': require('./lib/commands/backstop')
    }
  }
};
