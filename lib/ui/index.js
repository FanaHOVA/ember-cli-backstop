'use strict';

var PleasantProgress = require('pleasant-progress');
var progress = new PleasantProgress();

module.exports = {
  start: function(msg) {
    progress.start(msg)
  },
  write: function(msg) {
    progress.stream.write(msg);
  }
};
