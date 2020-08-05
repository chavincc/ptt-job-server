const { GoogleSpreadsheet } = require('google-spreadsheet');

const creds = require('../config/client_secret');
const { getCellColor, getColorMethod } = require('../utils/method');
const { CONSTRUCTION_METHOD } = require('../types/method');

describe('describe cell method', () => {
  let doc, sheet;
  let hddCell, openCutCell, boreCell, blankCell, E4;

  beforeEach(async () => {
    doc = new GoogleSpreadsheet('1locTXx46eaGwOCd1V8xRI84jbaoVUr4YQFnHy6C0ylk');
    await doc.useServiceAccountAuth({
      client_email: creds.client_email,
      private_key: creds.private_key,
    });
    await doc.loadInfo();
    sheet = await doc.sheetsByIndex[0];
    await sheet.loadCells('A1:CI21');
    hddCell = sheet.getCellByA1('F7');
    openCutCell = sheet.getCellByA1('AF7');
    boreCell = sheet.getCellByA1('BM7');
    blankCell = sheet.getCellByA1('E6');
    E4 = sheet.getCellByA1('E4');
  });

  it('get color and method from cell', () => {
    expect(getCellColor(hddCell)).toBe('00b0f0');
    expect(getCellColor(openCutCell)).toBe('ffff00');
    expect(getCellColor(boreCell)).toBe('fabf8f');
    expect(getCellColor(blankCell)).toBe('000000');
    expect(getCellColor(E4)).toBe('8db3e2');

    expect(getColorMethod(getCellColor(hddCell))).toBe(CONSTRUCTION_METHOD.HDD);
    expect(getColorMethod(getCellColor(openCutCell))).toBe(
      CONSTRUCTION_METHOD.OPEN_CUT
    );
    expect(getColorMethod(getCellColor(boreCell))).toBe(
      CONSTRUCTION_METHOD.BORE
    );
    expect(getColorMethod(getCellColor(blankCell))).toBe(
      CONSTRUCTION_METHOD.UNDECIDED
    );
    try {
      getColorMethod(getCellColor(E4));
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
});
