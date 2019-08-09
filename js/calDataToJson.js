//converts csv files to a JSON object
let csvToJson = require('convert-csv-to-json');

const csvFilePath = '../data/calendar_data.csv'

let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(csvFilePath);

module.exports = json