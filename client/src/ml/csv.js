var fs = require('fs');

export const appendLines = (lines, filename = 'data.csv') => {
  fs.appendFile(filename, lines, function (err) {
    if (err) throw err;
    console.log('Updated!');
  });
}


export const asJSON = (contents) => {
  if(typeof contents === "string") {
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
  return contents;
}
