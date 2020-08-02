const { GoogleSpreadsheet } = require('google-spreadsheet');

const creds = require('./config/client_secret');
const { computeProgress } = require('./utils/progress');
const { convertA1ToCoord, convertCoordToA1 } = require('./utils/cell');

const doc = new GoogleSpreadsheet(
  '1locTXx46eaGwOCd1V8xRI84jbaoVUr4YQFnHy6C0ylk'
);

const FIRST_CELL = 'C4';
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
    console.log(i);
    console.log(
      `${convertCoordToA1({
        row: FIRST_ROW,
        col: FIRST_COL + ROW_HEIGHT * i,
      })}:${convertCoordToA1({
        row: FIRST_ROW + ROW_WIDTH,
        col: FIRST_COL + ROW_HEIGHT * i + ROW_HEIGHT - 1,
      })}`
    );
    await sheet.loadCells(
      `${convertCoordToA1({
        row: FIRST_ROW,
        col: FIRST_COL + ROW_HEIGHT * i,
      })}:${convertCoordToA1({
        row: FIRST_ROW + ROW_WIDTH - 1,
        col: FIRST_COL + ROW_HEIGHT * i + ROW_HEIGHT - 1,
      })}`
    );
  }
  // await sheet.loadCells('B3124:B3125');
};

accessSpreadsheet();
