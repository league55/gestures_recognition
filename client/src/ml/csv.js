var fs = require('fs');

exports.appendLines = (lines, filename = 'data.csv') => {
  fs.appendFile(filename, lines, function (err) {
    if (err) throw err;
    console.log('Updated!');
  });
}
