const { convertA1ToCoord, convertCoordToA1 } = require('../utils/cell');

describe('cell position', () => {
  const cases = [
    {
      input: {
        row: 0,
        col: 0,
      },
      output: 'A1',
    },
    {
      input: {
        row: 1,
        col: 1,
      },
      output: 'B2',
    },
    {
      input: {
        row: 25,
        col: 25,
      },
      output: 'Z26',
    },
    {
      input: {
        row: 26,
        col: 26,
      },
      output: 'AA27',
    },
    {
      input: {
        row: 27,
        col: 27,
      },
      output: 'AB28',
    },
    {
      input: {
        row: 753,
        col: 753,
      },
      output: 'ABZ754',
    },
  ];

  it('convert (row, col) to A1 format', () => {
    cases.forEach((testcase) => {
      expect(convertCoordToA1(testcase.input)).toBe(testcase.output);
    });
    try {
      convertCoordToA1({
        row: -1,
        col: 0,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(RangeError);
    }
    try {
      convertCoordToA1({
        row: 0,
        col: -1,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(RangeError);
    }
  });

  it('convert A1 format to (row, col)', () => {
    cases.forEach((testcase) => {
      const { row, col } = convertA1ToCoord(testcase.output);
      expect(row).toBe(testcase.input.row);
      expect(col).toBe(testcase.input.col);
    });
  });
});
