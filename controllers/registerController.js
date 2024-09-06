const { postSheetRegister } = require("../services/googleSheets");

/* Post Register */
const registerContact = async (req, res) => {
  try {
    const sheetId = process.env.SHEET_ID_REGISTER;
    const range = process.env.RANGE_NAME_SHEET_REGISTER;
    const body = req.body;
    const data = await postSheetRegister(sheetId, range, body);

    res.status(200).json({ type: "success", data: "Pronto Te Contactáremos."})
  } catch (error) {
    res.status(400).json({ type: "error", data: "Error al Enviar los Datos"})
  }
};
module.exports = {
  registerContact,
};
