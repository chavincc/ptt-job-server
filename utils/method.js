const { CONSTRUCTION_METHOD } = require('../types/method');

const getCellColor = (cell) => {
  if (cell.userEnteredFormat.backgroundColor) {
    const { red, green, blue } = cell.userEnteredFormat.backgroundColor;
    const hexRed = rgbToHex(Math.round(red * 255));
    const hexGreen = rgbToHex(Math.round(green * 255));
    const hexBlue = rgbToHex(Math.round(blue * 255));
    return `${hexRed}${hexGreen}${hexBlue}`;
  }
  return '000000';
};

const rgbToHex = (rgb) => {
  if (!rgb) return '00';

  const hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = '0' + hex;
  }
  return hex;
};

const getColorMethod = (color = '') => {
  const colorMapper = {
    '00b0f0': CONSTRUCTION_METHOD.HDD,
    fabf8f: CONSTRUCTION_METHOD.BORE,
    ffff00: CONSTRUCTION_METHOD.OPEN_CUT,
    '000000': CONSTRUCTION_METHOD.UNDECIDED,
  };

  if (colorMapper[color]) return colorMapper[color];
  else throw new TypeError('unknown color');
};

module.exports = {
  getCellColor,
  getColorMethod,
  CONSTRUCTION_METHOD,
};
