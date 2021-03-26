  exports.getDistance = (a, b) => {
    const distanceRaw = ((a.x - b.x) ** 2 + (a.y - b.y) ** 2) ** 0.5;
    console.debug("distanceRaw", distanceRaw);
    const distanceReal = distanceRaw / ((a.z + b.z) / 2);
    console.debug("distanceReal", distanceReal);
  }
