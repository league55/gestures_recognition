var fs = require('fs');

exports.appendLines = (lines, filename = 'data.csv') => {
  fs.appendFile(filename, lines, function (err) {
    if (err) throw err;
    console.log('Updated!');
  });
}


exports.asJSON = (contents) => {
  return contents.split("\n")
    .filter(lineStr => lineStr.length)
    .map((lineStr) => {
      try {
        return JSON.parse("[" + lineStr + "]");
      } catch (e) {
        return undefined;
      }
    }).filter(a => !!a);
}
