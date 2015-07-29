/* globals module */

'use strict';

var ui = require('../ui');
var chalk = require('chalk');
var fs = require('fs-extra');
var path = require('path');
var exec = require('child_process').exec;
var RSVP = require('rsvp');

var cwd = process.cwd();
var projectPath = path.join(cwd, "tests", "backstop");
var projectJSONPath = path.join(projectPath, 'backstop.json');
var projectReferencesPath = path.join(projectPath, "references");
var backstopPath = path.join(cwd, "node_modules", "ember-cli-backstop", "node_modules", "backstopjs");
var backstopJSONPath = path.join(cwd, "node_modules", "ember-cli-backstop", "backstop.json");
var backstopReferencePath = path.join(backstopPath, "bitmaps_reference");


function logError(message, error) {
  ui.write(chalk.red("\nError thrown while " + message + "\n"));
  if (error.stack) {
    ui.write(error.stack);
  } else {
    ui.write(error);
  }
}

function copyBackstopJSONFromTests() {
  return new RSVP.Promise(function (resolve, reject) {
    fs.copy(projectJSONPath, backstopJSONPath, true, function (error) {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}
function copyBitmapsReferenceFromTests() {
  return new RSVP.Promise(function (resolve, reject) {
    fs.copy(projectReferencesPath, backstopReferencePath, true, function (error) {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}
function copyBitmapsReferenceToTests() {
  return new RSVP.Promise(function (resolve, reject) {
    fs.copy(backstopReferencePath, projectReferencesPath, true, function (error) {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}
function removeBitmapsReferenceFromBackstop() {
  return new RSVP.Promise(function (resolve, reject) {
    fs.remove(backstopReferencePath, function (error) {
      if (error) {
        return reject(error);
      }
      resolve();
    });

  });
}
function removeBitmapsReferenceFromTests() {
  return new RSVP.Promise(function (resolve, reject) {
    fs.remove(projectReferencesPath, function (error) {
      if (error) {
        return reject(error);
      }
      resolve();
    });

  });
}

module.exports = {
  name: 'backstop',
  description: 'Passes through commands to backstop',
  backstopCommands: [
    'reference', 'test', 'strict'
  ],

  runTestCommand: function (command, options, strict) {
    // Ensure the project references directory exists
    fs.ensureDir(projectReferencesPath, function (error) {
      if (error) {
        logError("locating tests/backstop directory.", error);
      }
    });

    function executeTest() {
      return new RSVP.Promise(function (resolve, reject) {
        exec(command, options, function (error, stdout, stderr) {
          ui.write('\n');
          if (!strict) {
            ui.write(stdout)
          }
          if (stderr && stderr.length) {
            ui.write(stderr);
          }
          if (error) {
            return reject(error);
          }
          resolve();
        });
      });
    }

    ui.start(chalk.green("Starting backstop test "));

    return removeBitmapsReferenceFromBackstop().then(function () {
      return copyBackstopJSONFromTests();
    }, function (error) {
      logError("trying to remove reference files from backstopjs", error);
    }).then(function () {
      return copyBitmapsReferenceFromTests();
    }, function (error) {
      logError("trying to copy backstop.json from tests/backstop", error);
    }).then(function () {
      return executeTest();
    }, function (error) {
      logError("trying to copy reference files from tests/backstop", error);
    }).then(function () {
      ui.write(chalk.green("\nFinished backstop test. Visit localhost:3001/compare to see BackstopJS Report.\n"));
    }, function (error) {
      logError("trying to execute test command", error);
    });
  },

  runReferenceCommand: function (command, options, strict) {
    // Ensure the project references directory exists
    fs.ensureDir(projectReferencesPath, function (error) {
      if (error) {
        logError("locating tests/backstop directory.", error);
      }
    });

    function generateBitmapsReference() {
      return new RSVP.Promise(function (resolve, reject) {
        exec(command, options, function (error, stdout, stderr) {
          ui.write('\n');
          if (!strict) {
            ui.write(stdout)
          }
          if (stderr && stderr.length) {
            ui.write(stderr);
          }
          if (error) {
            return reject(error);
          }
          resolve();
        });
      });
    }

    ui.start(chalk.green("Starting backstop reference "));

    return copyBackstopJSONFromTests().then(function () {
      return generateBitmapsReference();
    }, function (error) {
      logError("trying to move backstop.json from tests/backstop ", error);
    }).then(function () {
      //TODO improve functionality to address behaviour?
      return removeBitmapsReferenceFromTests();
    }, function (error) {
      logError("generating reference files", error);
    }).then(function () {
      return copyBitmapsReferenceToTests();
    }, function (error) {
      logError("trying to remove references from tests/backstop ", error);
    }).then(function () {
      ui.write(chalk.green("\nFinished backstop reference \n"));
    }, function (error) {
      logError("trying to move bitmaps to tests/backstop ", error);
    });
  },

  validateAndRun: function (rawArgs) {
    if (this.backstopCommands.indexOf(rawArgs[0]) == 0) {
      if (this.backstopCommands.indexOf(rawArgs[1]) == 2) {
        return this.runReferenceCommand('../gulp/bin/gulp.js reference', {cwd: backstopPath}, true);
      }
      return this.runReferenceCommand('../gulp/bin/gulp.js reference', {cwd: backstopPath}, false);
    } else if (this.backstopCommands.indexOf(rawArgs[0]) == 1) {
      if (this.backstopCommands.indexOf(rawArgs[1]) == 2) {
        return this.runTestCommand('../gulp/bin/gulp.js test', {cwd: backstopPath}, true);
      }
      return this.runTestCommand('../gulp/bin/gulp.js test', {cwd: backstopPath}, false);
    } else {
      return logError("error validating command", rawArgs);
    }
  }
};
