function getDataLocal(lineStr) {
  const pairs = [[2, 5], [3, 6], [4, 8], [8, 12], [8, 20], [4, 12], [4, 16], [12, 16], [9, 12], [0, 20]];
  const label = lineStr.substring(lineStr.lastIndexOf(",") + 1);
  const line = JSON.parse("[" + lineStr.substring(0, lineStr.lastIndexOf(",")) + "]");

  const distances = pairs.map(pair => {
    let ai = pair[0]; // i is for index
    let bi = pair[1];
    return Math.abs(getRealDistance(line[ai], line[bi]) / 100);
  });

  return {label, distances};
}

exports.getData = (lineStr) => {
  return getDataLocal(lineStr);
}

exports.getDistancesData = (line) => {
  const pairs = [[2, 5], [3, 6], [4, 8], [8, 12], [8, 20], [4, 12], [4, 16], [12, 16], [9, 12], [0, 20]];

  return pairs.map(pair => {
    let ai = pair[0]; // i is for index
    let bi = pair[1];
    return Math.abs(getRealDistance(line[ai], line[bi]) / 100);
  });
}

exports.prepareData = (contents) => {
  const distancesData = [];

  contents.split("\n").forEach((lineStr) => {
    if (lineStr.length) {
      const {label, distances} = getDataLocal(lineStr);
      distancesData.push([distances, label]);
    }
  });
  return distancesData;
}


const getRealDistance = (a, b) => {
  const distanceRaw = ((a.x - b.x) ** 2 + (a.y - b.y) ** 2) ** 0.5;
  // console.debug("distanceRaw", distanceRaw);
  const distanceReal = distanceRaw / ((a.z + b.z) / 2);
  // console.debug("distanceReal", distanceReal);
  return distanceReal;
}
