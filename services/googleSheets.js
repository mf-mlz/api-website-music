require("dotenv").config();
const { google } = require("googleapis");
const sheets = google.sheets("v4");

async function getSheetData(sheetId, range) {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS_ROUTE,
    scopes: [process.env.GOOGLE_SHEETS_SCOPES],
  });

  const client = await auth.getClient();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: range,
    auth: client,
  });

  return response.data.values;
}

async function postSheetRegister(sheetId, range, body) {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS_ROUTE,
    scopes: [process.env.GOOGLE_SHEETS_SCOPES],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const resource = {
    values: [
      [
        body.nombre,
        body.telefono,
        body.correo,
        body.lugar,
        body.fecha,
        body.horario,
        body.paquete,
        "No",
      ],
    ],
  };

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: range,
      valueInputOption: "RAW",
      resource: resource,
    });
    return true;
  } catch (error) {
    return error;
  }
}

module.exports = { getSheetData, postSheetRegister };
