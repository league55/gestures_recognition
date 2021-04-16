const {normalizeCoordinates} = require("./geometry");

function getDataLocal(line) {
  const label = line.pop();
  const features = normalizeCoordinates(line)[1];
  return {label, features};
}

exports.getData = (lineStr) => {
  return getDataLocal(lineStr);
}


exports.prepareData = (contents) => {
  const data = [];

  contents.forEach((line) => {
      const {label, features} = getDataLocal(line);
      data.push([features, label]);
  });
  return data;
}