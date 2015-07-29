/* globals module */

var chalk = require('chalk');
var execSync = require('child_process').execSync;
var exec = require('child_process').exec;
var fs = require("fs-extra");
var path = require("path");
var RSVP = require('rsvp');
var ui = require('../../lib/ui');

function logError(message, error) {
  ui.write(chalk.red("\nError thrown while " + message + "\n"));
  if (error.stack) {
    ui.write(error.stack);
  } else {
    ui.write(error);
  }
}

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    var cwd = process.cwd();
    var projectPath = path.join(cwd, "tests", "backstop");
    var projectJSONPath = path.join(projectPath, 'backstop.json');
    var projectReferencesPath = path.join(projectPath, "references");
    var backstopPath = path.join(cwd, "node_modules", "ember-cli-backstop", "node_modules", "backstopjs");
    var backstopJSONPath = path.join(cwd, "node_modules", "ember-cli-backstop", "backstop.json");

    // Ensure the project references directory exists
    fs.ensureDir(projectReferencesPath, function(error) {
      if (error) {
        logError("creating the tests/backstop directory", error);
      }
    });

    var generateBackstopJSON = new RSVP.Promise(function(resolve, reject) {
      try {
        if (fs.existsSync(projectJSONPath)) {
          resolve(false);
        } else {
          execSync('../gulp/bin/gulp.js genConfig', {cwd: backstopPath});
          resolve(true);
        }
      }
      catch(error) {
        reject(error);
      }
    });

    var moveBackstopJSON = new RSVP.Promise(function(resolve, reject) {
      fs.move(backstopJSONPath, projectJSONPath, function(error) {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });

    return generateBackstopJSON.then(
      function(isGenerated) {
        if (isGenerated) {
          ui.write(chalk.green("\nGenerated backstop.json"));
          return moveBackstopJSON;
        }
      },
      function(error) {
        logError("generating backstop.json", error);
      }
    ).then(
      function() {
        ui.write(chalk.green("\nMoved backstop.json to tests/backstop/backstop.json\n"));
      },
      function(error) {
        logError("moving backstop.json", error);
      }
    );
  }
};
