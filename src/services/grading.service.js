const { default: axios } = require('axios');
const config = require('../config/config');

const submitBatchService = async (data) => {
  return (
    await axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions/batch?base64_encoded=true&wait=false&fields=*&wait=true',
      {
        submissions: data,
      },
      {
        headers: {
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'x-rapidapi-key': config.judge0.apiKey,
        },
        params: {
          redirect_stderr_to_stdout: true,
        },
      }
    )
  ).data;
};

const getBatchSubmissionsService = async (tokens) => {
  return (
    await axios.get('https://judge0-ce.p.rapidapi.com/submissions/batch?base64_encoded=true&wait=false&fields=*&wait=true', {
      params: {
        tokens: tokens.join(','),
        redirect_stderr_to_stdout: true,
      },
      headers: {
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'x-rapidapi-key': config.judge0.apiKey,
      },
    })
  ).data;
};

module.exports = {
  submitBatchService,
  getBatchSubmissionsService,
};
