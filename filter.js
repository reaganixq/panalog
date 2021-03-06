var add = [
  'name',
  'info',
  'contact',
  'employment',
  'projects',
  'skills',
  'recognition'
];

var exclude = [
  'location',
  'social',
  'samples',
  'reading',
  'interests'
];

// --------------------------

function main() {
  var fs = require('fs');
  var path = require('path');

  // collect the command-line args
  var args = process.argv.slice(2);
  var inputFile = args[0];
  var outputFile = args[1];

  // read in the full resume
  var inputPath = path.join(__dirname, inputFile);
  var input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

  // filter out unwanted fields
  var output = trimResume(input);

  // write the results to file
  fs.writeFile(outputFile, JSON.stringify(output, null, 2), (err) => {
    if (err) {
      return console.log(err);
    }
  });
}

// --------------------------

// filter objects by their keys
Object.filterByKey = function (obj, predicate) {
  var result = {};
  var key;

  for (key in obj) {
    if (obj.hasOwnProperty(key) && predicate(key)) {
      result[key] = obj[key];
    }
  }

  return result;
};

// comparator to see if array contains an entry
Array.prototype.contains = function(obj) {
  return this.indexOf(obj) > -1;
};

// filter out unwanted sections
function trimResume(resume) {
  return Object.filterByKey(resume, (key) => { return add.contains(key); });
}

main();