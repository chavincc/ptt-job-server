const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const convertCoordToA1 = ({ row = 0, col = 0 }) => {
  if (row < 0 || col < 0) throw new RangeError('cell cannot be negative');

  let copiedRow = row;
  let processedRow = '';
  while (copiedRow > 0) {
    const remainder = copiedRow % 26;
    processedRow = ALPHABET[remainder] + processedRow;
    copiedRow = Math.floor(copiedRow / 26) - 1;
  }
  if (copiedRow === 0) {
    processedRow = 'A' + processedRow;
  }
  return `${processedRow}${col + 1}`;
};

const convertA1ToCoord = (a1 = '') => {
  let encodedRow = '';
  let index;
  for (index = 0; index < a1.length; index++) {
    if (ALPHABET.includes(a1[index])) encodedRow += a1[index];
    else break;
  }
  let row = 0;
  for (let i = 0; i < encodedRow.length; i++) {
    row +=
      (ALPHABET.indexOf(encodedRow[encodedRow.length - i - 1]) + 1) *
      Math.pow(26, i);
  }

  const col = a1.slice(index, a1.length);
  return {
    row: row - 1,
    col: parseInt(col) - 1,
  };
};

module.exports = {
  convertA1ToCoord,
  convertCoordToA1,
};
