const { GoogleSpreadsheet } = require('google-spreadsheet');

const creds = require('./config/client_secret');
const { computeProgress } = require('./utils/progress');
const { getProvince, sanitizeRawMeters } = require('./utils/province');
const { convertA1ToCoord, convertCoordToA1 } = require('./utils/cell');
const { getCellColor, getColorMethod } = require('./utils/method');

const { PROVINCE } = require('./types/province');
const { COMPUTED_PROGRESS_STATE } = require('./types/progress');
const { CONSTRUCTION_METHOD } = require('./types/method');
const progress = require('./types/progress');

const doc = new GoogleSpreadsheet(
  '1locTXx46eaGwOCd1V8xRI84jbaoVUr4YQFnHy6C0ylk'
);

const FIRST_CELL = 'D4';
const ROW_WIDTH = 81;
const ROW_HEIGHT = 16;

const accessSpreadsheet = async () => {
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo();
  console.log(doc.title);
  const sheet = await doc.sheetsByIndex[1]; // or use doc.sheetsById[id]
  console.log(sheet.title);

  const FIRST_CELL_COORD = convertA1ToCoord(FIRST_CELL);
  const FIRST_ROW = FIRST_CELL_COORD.row;
  const FIRST_COL = FIRST_CELL_COORD.col;

  const progressResult = {};
  Object.values(PROVINCE).forEach((province) => {
    progressResult[province] = {};
    Object.values(CONSTRUCTION_METHOD).forEach((method) => {
      progressResult[province][method] = {};
      Object.values(COMPUTED_PROGRESS_STATE).forEach((state) => {
        progressResult[province][method][state] = 0;
      });
    });
  });

  for (let i = 0; i < 195; i++) {
    console.log(
      `${convertCoordToA1({
        row: FIRST_ROW + ROW_HEIGHT * i,
        col: FIRST_COL,
      })}:${convertCoordToA1({
        row: FIRST_ROW + ROW_HEIGHT * i + ROW_HEIGHT - 1,
        col: FIRST_COL + ROW_WIDTH - 1,
      })}`
    );
    await sheet.loadCells(
      `${convertCoordToA1({
        row: FIRST_ROW + ROW_HEIGHT * i,
        col: FIRST_COL,
      })}:${convertCoordToA1({
        row: FIRST_ROW + ROW_HEIGHT * i + ROW_HEIGHT - 1,
        col: FIRST_COL + ROW_WIDTH - 1,
      })}`
    );

    let method;
    for (
      let currentCol = FIRST_COL;
      currentCol < FIRST_COL + ROW_WIDTH;
      currentCol++
    ) {
      const { kp, add } = sanitizeRawMeters(
        sheet.getCell(FIRST_ROW + ROW_HEIGHT * i, currentCol).value
      );
      let province;
      try {
        province = getProvince({ kp, add });
      } catch (error) {
        if (error instanceof RangeError) {
          continue;
        }
      }
      const methodCell = sheet.getCell(
        FIRST_ROW + ROW_HEIGHT * i + 2,
        currentCol
      );
      method = methodCell.userEnteredFormat
        ? getColorMethod(getCellColor(methodCell))
        : method;

      const progress = computeProgress(
        sheet,
        FIRST_ROW + ROW_HEIGHT * i + 3,
        currentCol
      );

      progressResult[province][method][progress]++;
    }
  }
  console.log(progressResult);
};

accessSpreadsheet();
