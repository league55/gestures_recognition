var fs = require('fs');

exports.appendLines = (lines) => {
  const res = lines.map(line => line.join(',')).join('\n');
  fs.appendFile('data.csv', res, function (err) {
    if (err) throw err;
    console.log('Updated!');
  });
}
