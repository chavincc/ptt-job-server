const { PROVINCE } = require('../types/province');

const compareLocation = (
  _this = { kp: 0, add: 0 },
  _other = { kp: 0, add: 0 }
) => {
  const this_kp = _this.kp;
  const this_add = _this.add;
  const other_kp = _other.kp;
  const other_add = _other.add;

  if (this_kp < other_kp) return -1;
  else if (this_kp > other_kp) return 1;
  else {
    if (this_add < other_add) return -1;
    else if (this_add > other_add) return 1;
    else return 0;
  }
};

const getProvince = (location = { kp: 0, add: 0 }) => {
  if (compareLocation(location, { kp: 145, add: 534 }) < 0) {
    // out of range (lower)
    throw new RangeError();
  }
  if (compareLocation(location, { kp: 170, add: 672 }) < 0) {
    return PROVINCE.CHA;
  }
  if (compareLocation(location, { kp: 176, add: 296 }) < 0) {
    return PROVINCE.PRA;
  }
  if (compareLocation(location, { kp: 202, add: 762 }) < 0) {
    return PROVINCE.CHA;
  }
  if (compareLocation(location, { kp: 208, add: 662 }) < 0) {
    return PROVINCE.BKK;
  }
  if (compareLocation(location, { kp: 246, add: 969 }) < 0) {
    return PROVINCE.PAT;
  }
  if (compareLocation(location, { kp: 315, add: 644 }) < 0) {
    return PROVINCE.AUT;
  }
  if (compareLocation(location, { kp: 345, add: 416 }) <= 0) {
    return PROVINCE.NON;
  } else {
    // out of range (higher)
    throw new RangeError();
  }
};

const sanitizeRawMeters = (meter = 0) => {
  const roundedMeter = Math.round(meter);
  const kp = Math.round(roundedMeter / 1000);
  const add = roundedMeter % 1000;
  return {
    kp,
    add,
  };
};

module.exports = {
  PROVINCE,
  compareLocation,
  getProvince,
  sanitizeRawMeters,
};
