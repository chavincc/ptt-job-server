const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const convertCoordToA1 = ({ row = 0, col = 0 }) => {
  if (row < 0 || col < 0) throw new RangeError('cell cannot be negative');

  let copiedCol = col;
  let processedCol = '';
  while (copiedCol > 0) {
    const remainder = copiedCol % 26;
    processedCol = ALPHABET[remainder] + processedCol;
    copiedCol = Math.floor(copiedCol / 26) - 1;
  }
  if (copiedCol === 0) {
    processedCol = 'A' + processedCol;
  }
  return `${processedCol}${row + 1}`;
};

const convertA1ToCoord = (a1 = '') => {
  let encodedCol = '';
  let index;
  for (index = 0; index < a1.length; index++) {
    if (ALPHABET.includes(a1[index])) encodedCol += a1[index];
    else break;
  }
  let col = 0;
  for (let i = 0; i < encodedCol.length; i++) {
    col +=
      (ALPHABET.indexOf(encodedCol[encodedCol.length - i - 1]) + 1) *
      Math.pow(26, i);
  }

  const row = a1.slice(index, a1.length);
  return {
    row: row - 1,
    col: parseInt(col) - 1,
  };
};

module.exports = {
  convertA1ToCoord,
  convertCoordToA1,
};
