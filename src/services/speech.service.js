const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const client = require('../config/assemblyai');

// /**
//  *
//  * @param {string} fileUrl
//  * @returns {Promise<Object>}
//  */
// const speechToText = async (fileUrl) => {
//   const audioFilePath = path.join(__dirname, `${v4()}.mp3`);

//   try {
//     // Download the audio file to the specified path
//     await fileService.download(fileUrl, audioFilePath);

//     // Transcribe the downloaded audio file using OpenAI
//     const transcription = await openai.audio.transcriptions.create({
//       // eslint-disable-next-line security/detect-non-literal-fs-filename
//       file: fs.createReadStream(audioFilePath),
//       model: 'whisper-1',
//     });

//     // Return the transcription
//     return transcription;
//   } catch (error) {
//     // Clean up downloaded file (optional)
//     console.log(error);
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid audio file');
//   } finally {
//     // Clean up downloaded file
//     // eslint-disable-next-line security/detect-non-literal-fs-filename
//     fs.unlinkSync(audioFilePath);
//   }
// };

/**
 *
 * @param {string} fileUrl
 * @returns {Promise<import('assemblyai').Transcript>}
 */
const speechToText = async (fileUrl) => {
  try {
    return client.transcripts.create({
      audio_url: fileUrl,
    });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid audio file');
  }
};

module.exports = {
  speechToText,
};
