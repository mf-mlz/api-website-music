require("dotenv").config();
const { getSheetData } = require("../services/googleSheets");

/* Get Survey */
const getSurveyData = async (req, res) => {
  try {
    const sheetId = process.env.SHEET_ID_SURVEY;
    const range = process.env.RANGE_NAME_SHEET_SURVEY;
    const data = await getSheetData(sheetId, range);

    const parseDate = (dateString) => {
      const [datePart, timePart] = dateString.split(" ");
      const [day, month, year] = datePart.split("/").map(Number);
      return new Date(year, month - 1, day, ...timePart.split(":").map(Number));
    };

    if (data && data.length > 0) {
      const sortedData = data.sort((a, b) => {
        const dateA = parseDate(a[0]);
        const dateB = parseDate(b[0]);
        return dateB - dateA;
      });

      const recentData = sortedData.slice(0, 6);
      res.json(recentData);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = {
  getSurveyData,
};
