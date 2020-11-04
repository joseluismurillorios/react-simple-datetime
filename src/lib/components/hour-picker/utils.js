export const timeToDeg = (val, clamp = 12, adder = 0) => {
  const offset = 360 / clamp;
  const value = (val % clamp) + adder;
  return {
    degrees: (value * offset) - 90,
    value,
  };
};

export const hourToDeg = (val, clamp = 12, adder = 0) => {
  const offset = 360 / clamp;
  const value = (val % clamp) + adder;
  return (value * offset) - 90;
};

export const parse24hours = (val) => {
  const am = val < 12;
  const hour = val % 12;
  if (am) {
    return hour;
  } else {
    return hour === 0 ? 12 : hour;
  }
}

export const getRotation = (elem, x, y, round = 30, pad = 3) => {
  const rect = elem.getBoundingClientRect();
  const centerX = rect.x + rect.width / 2;
  const centerY = rect.y + rect.height / 2;
  const diffX = x - centerX;
  const diffY = y - centerY;

  let angle = Math.atan2(diffY, diffX);
  if (angle < 0) { angle += 2 * Math.PI; }
  const degrees = (angle * 180) / Math.PI;

  const rounded = Math.round(degrees / round) * round;

  let value = pad + rounded / round;
  if (value >= pad * 4) { value -= pad * 4; }
  return {
    degrees: rounded,
    value,
  };
};

export const getTouches = (e) => {
  if (e.type === 'touchmove' || e.type === 'touchstart') {
    return e.touches[0]
  }
  return e;
}
