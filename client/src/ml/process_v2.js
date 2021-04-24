const {normalizeCoordinates} = require("./geometry");

function getDataLocal(line) {
  const label = line[line.length - 1];
  const features = normalizeCoordinates(line.slice(0, line.length - 1))[1];
  return {label, features: features.map(feature => [feature.x, feature.y])};
}

export const prepareSingleEntry = (lineStr) => {
  return getDataLocal(lineStr);
}


export const prepareData = (contents) => {
  const data = [];

  contents.forEach((line) => {
      const {label, features} = getDataLocal(line);
      data.push([features, label]);
  });
  return data;
}
