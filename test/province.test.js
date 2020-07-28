const { compareLocation, getProvince, PROVINCE } = require('../utils/province');

describe('province location comparison', () => {
  it('kp higher, add higher', () => {
    expect(compareLocation({ kp: 150, add: 25 }, { kp: 145, add: 12 })).toBe(1);
  });
  it('kp higher, add equal', () => {
    expect(compareLocation({ kp: 150, add: 25 }, { kp: 145, add: 25 })).toBe(1);
  });
  it('kp higher, add lower', () => {
    expect(compareLocation({ kp: 150, add: 12 }, { kp: 145, add: 25 })).toBe(1);
  });

  it('kp equal, add higher', () => {
    expect(compareLocation({ kp: 150, add: 25 }, { kp: 150, add: 12 })).toBe(1);
  });
  it('kp equal, add equal', () => {
    expect(compareLocation({ kp: 150, add: 25 }, { kp: 150, add: 25 })).toBe(0);
  });
  it('kp equal, add lower', () => {
    expect(compareLocation({ kp: 150, add: 12 }, { kp: 150, add: 25 })).toBe(
      -1
    );
  });

  it('kp lower, add higher', () => {
    expect(compareLocation({ kp: 140, add: 25 }, { kp: 145, add: 12 })).toBe(
      -1
    );
  });
  it('kp lower, add equal', () => {
    expect(compareLocation({ kp: 140, add: 25 }, { kp: 145, add: 25 })).toBe(
      -1
    );
  });
  it('kp lower, add lower', () => {
    expect(compareLocation({ kp: 140, add: 12 }, { kp: 145, add: 25 })).toBe(
      -1
    );
  });
});

describe('get province from given location', () => {
  it('describe CHA (1)', () => {
    expect(getProvince({ kp: 145, add: 534 })).toBe(PROVINCE.CHA);
    expect(getProvince({ kp: 145, add: 535 })).toBe(PROVINCE.CHA);
    expect(getProvince({ kp: 160, add: 500 })).toBe(PROVINCE.CHA);
    expect(getProvince({ kp: 170, add: 671 })).toBe(PROVINCE.CHA);
  });
  it('describe PRA', () => {
    expect(getProvince({ kp: 170, add: 673 })).toBe(PROVINCE.PRA);
    expect(getProvince({ kp: 173, add: 500 })).toBe(PROVINCE.PRA);
    expect(getProvince({ kp: 170, add: 672 })).toBe(PROVINCE.PRA);
    expect(getProvince({ kp: 176, add: 295 })).toBe(PROVINCE.PRA);
  });
  it('describe CHA (2)', () => {
    expect(getProvince({ kp: 176, add: 296 })).toBe(PROVINCE.CHA);
    expect(getProvince({ kp: 176, add: 297 })).toBe(PROVINCE.CHA);
    expect(getProvince({ kp: 190, add: 500 })).toBe(PROVINCE.CHA);
    expect(getProvince({ kp: 202, add: 761 })).toBe(PROVINCE.CHA);
  });
  it('describe BKK', () => {
    expect(getProvince({ kp: 202, add: 762 })).toBe(PROVINCE.BKK);
    expect(getProvince({ kp: 202, add: 763 })).toBe(PROVINCE.BKK);
    expect(getProvince({ kp: 205, add: 500 })).toBe(PROVINCE.BKK);
    expect(getProvince({ kp: 208, add: 661 })).toBe(PROVINCE.BKK);
  });
  it('describe PAT', () => {
    expect(getProvince({ kp: 208, add: 662 })).toBe(PROVINCE.PAT);
    expect(getProvince({ kp: 208, add: 663 })).toBe(PROVINCE.PAT);
    expect(getProvince({ kp: 220, add: 500 })).toBe(PROVINCE.PAT);
    expect(getProvince({ kp: 246, add: 968 })).toBe(PROVINCE.PAT);
  });
  it('describe AUT', () => {
    expect(getProvince({ kp: 246, add: 969 })).toBe(PROVINCE.AUT);
    expect(getProvince({ kp: 246, add: 970 })).toBe(PROVINCE.AUT);
    expect(getProvince({ kp: 280, add: 500 })).toBe(PROVINCE.AUT);
    expect(getProvince({ kp: 315, add: 643 })).toBe(PROVINCE.AUT);
  });
  it('describe NON', () => {
    expect(getProvince({ kp: 315, add: 644 })).toBe(PROVINCE.NON);
    expect(getProvince({ kp: 315, add: 645 })).toBe(PROVINCE.NON);
    expect(getProvince({ kp: 330, add: 500 })).toBe(PROVINCE.NON);
    expect(getProvince({ kp: 345, add: 415 })).toBe(PROVINCE.NON);
    expect(getProvince({ kp: 345, add: 416 })).toBe(PROVINCE.NON);
  });
  it('reject OUT OF RANGE location', () => {
    try {
      getProvince({ kp: 145, add: 533 });
    } catch (error) {
      expect(error).toBeInstanceOf(RangeError);
    }

    try {
      getProvince({ kp: 345, add: 417 });
    } catch (error) {
      expect(error).toBeInstanceOf(RangeError);
    }
  });
});
