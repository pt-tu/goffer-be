const pdfParse = require('pdf-parse');
const axios = require('axios');

const checkPdf = async (url) => {
  let dataBuffer;
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    dataBuffer = response.data;

    await pdfParse(dataBuffer);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  checkPdf,
};
