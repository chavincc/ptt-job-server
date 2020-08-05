const { GoogleSpreadsheet } = require('google-spreadsheet');

const creds = require('../config/client_secret');
const { computeProgress } = require('../utils/progress');
const { COMPUTED_PROGRESS_STATE } = require('../types/progress');

describe('pipe progress', () => {
  let doc, sheet;

  beforeEach(async () => {
    doc = new GoogleSpreadsheet('1locTXx46eaGwOCd1V8xRI84jbaoVUr4YQFnHy6C0ylk');
    await doc.useServiceAccountAuth({
      client_email: creds.client_email,
      private_key: creds.private_key,
    });
    await doc.loadInfo();
    sheet = await doc.sheetsByIndex[0];
    await sheet.loadCells('A1:CI21');
  });

  it('compute state', () => {
    expect(computeProgress(sheet, 7, 4)).toBe(
      COMPUTED_PROGRESS_STATE.NON_ACTIVE
    );
    expect(computeProgress(sheet, 7, 5)).toBe(
      COMPUTED_PROGRESS_STATE.NON_ACTIVE
    );
    expect(computeProgress(sheet, 7, 7)).toBe(
      COMPUTED_PROGRESS_STATE.IN_PROGRESS
    );
    expect(computeProgress(sheet, 7, 8)).toBe(
      COMPUTED_PROGRESS_STATE.IN_PROGRESS
    );
    expect(computeProgress(sheet, 7, 13)).toBe(
      COMPUTED_PROGRESS_STATE.IN_PROGRESS
    );
    expect(computeProgress(sheet, 7, 14)).toBe(COMPUTED_PROGRESS_STATE.DONE);
    expect(computeProgress(sheet, 7, 15)).toBe(COMPUTED_PROGRESS_STATE.DONE);
    expect(computeProgress(sheet, 7, 17)).toBe(COMPUTED_PROGRESS_STATE.DONE);
    expect(computeProgress(sheet, 7, 18)).toBe(COMPUTED_PROGRESS_STATE.DONE);
  });
});
