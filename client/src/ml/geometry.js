export const getDistance = (a, b) => {
  const distanceRaw = ((a.x - b.x) ** 2 + (a.y - b.y) ** 2) ** 0.5;
  console.debug("distanceRaw", distanceRaw);
  const distanceReal = distanceRaw / ((a.z + b.z) / 2);
  console.debug("distanceReal", distanceReal);
}

export const normalizeCoordinates = (pointsList = []) => {
  const extrems = {leftX: 1, bottomY: 1, rightX: 0, topY: 0};
  const bordersInitial = {leftX: 0, bottomY: 0, rightX: 1, topY: 1};

  pointsList.forEach((point) => {
    extrems.leftX = Math.min(extrems.leftX, point.x);
    extrems.rightX = Math.max(extrems.rightX, point.x);
    extrems.bottomY = Math.min(extrems.bottomY, point.y);
    extrems.topY = Math.max(extrems.topY, point.y);
  });

  const xAxisLength = bordersInitial.rightX;
  const yAxisLength = bordersInitial.topY;

  const newXaxisLength = extrems.rightX - extrems.leftX;
  const newYaxisLength = extrems.topY - extrems.bottomY;

  const koefX = xAxisLength / newXaxisLength;
  const koefY = yAxisLength / newYaxisLength;



  const botLeft = pointsList.map(p => {
    return  {x: p.x - extrems.leftX, y: p.y - extrems.bottomY};
  });

  const fixed = botLeft.map(p => {
    return {x: p.x * koefX, y: p.y * koefY};
  });
  return [botLeft, fixed];
}
