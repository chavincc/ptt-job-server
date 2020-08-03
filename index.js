const { GoogleSpreadsheet } = require('google-spreadsheet');

const creds = require('./config/client_secret');
const { computeProgress } = require('./utils/progress');
const { getProvince, sanitizeRawMeters } = require('./utils/province');
const { convertA1ToCoord, convertCoordToA1 } = require('./utils/cell');
const { getCellColor, getColorMethod } = require('./utils/method');

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
      try {
        const province = getProvince({ kp, add });
        console.log('---', province);
      } catch (error) {
        if (error instanceof RangeError) {
          console.log('--- skipped');
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
      console.log('----', method);

      const progress = computeProgress(
        sheet,
        FIRST_ROW + ROW_HEIGHT * i + 3,
        currentCol
      );
      console.log('----', progress);
    }
  }
};

accessSpreadsheet();
