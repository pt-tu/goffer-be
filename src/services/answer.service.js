const httpStatus = require('http-status');
const { Answer } = require('../models');
const speechService = require('./speech.service');
const chataiService = require('./chatai.service');
const { applyService } = require('.');
const ApiError = require('../utils/ApiError');
const { openai } = require('../config/openai');

/**
 *
 * @param {Answer} body
 * @returns {Promise<Answer>}
 */
const createAnswer = async (body) => {
  const answer = await Answer.create(body);
  return answer;
};

/**
 *
 * @param {Object} filter
 * @param {Object} options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAnswers = async (filter, options) => {
  const answers = await Answer.paginate(filter, options);
  return answers;
};

/**
 *
 * @param {string} id
 * @returns {Promise<Answer>}
 */
const getAnswer = async (id) => {
  let answer = await Answer.findById(id).populate('owner').populate('question');
  answer = answer.toJSON();
  return answer;
};

/**
 *
 * @param {Answer} body
 * @returns {Promise<Answer>}
 */
const submitAnswer = async (body) => {
  const answer = await Answer.create(body);
  return answer;
};

/**
 *
 * @param {string} audioUrl
 * @returns {Promise<string>}
 */
const summarizeAudio = async (audioUrl) => {
  const transcript = await speechService.speechToText(audioUrl);
  const prompt = `You are receiving an answer from a candidate. Your mission is to summarize the answer within 50 words. The candidate says: "${transcript.text}". Summarize it.`;
  const summary = await chataiService.complete(prompt);
  return { transcript, summary };
};

/**
 *
 * @param {AssemblyTranscript} transcript
 * @param {string} question
 * @param {Job} job
 * @returns {Promise<string>}
 */
const analyzeSentiment = async (transcript, question, job) => {
  try {
    const sentences = transcript.words.reduce(
      (result, word) => {
        const lastSentence = result[result.length - 1];

        if (word.text === '.' || word === transcript.words[transcript.words.length - 1]) {
          lastSentence.confidence /= lastSentence.words.length;
          lastSentence.end = word.end;

          if (word !== transcript.words[transcript.words.length - 1]) {
            result.push({ text: '', words: [], confidence: 0, start: word.end });
          }
        } else {
          lastSentence.text += lastSentence.text.length > 0 ? `${word.text} ` : word.text;
          lastSentence.words.push(word);
          lastSentence.confidence += word.confidence;
          if (!lastSentence.start) {
            lastSentence.start = word.start;
          }
        }

        return result;
      },
      [{ text: '', words: [], confidence: 0 }]
    );

    const jobDescription = {
      title: job.title,
      description: job.description,
      experience: job.experience,
      skill: job.skills,
      tools: job.tools,
    };

    const prompt = `You are an expert in sentiment and tone analysis. Please analyze the following text, which is an excerpt from a job candidate's interview response:

    **Job Description:**
    ${jobDescription.toString()}

    **Question:**
    ${question}

    **Interview Response:**
    ${sentences.map((s) => `Sentence: ${s.text} (Confidence: ${s.confidence}, Start: ${s.start}, End: ${s.end})`).join('\n')}

    **Analysis:**
    1. **Sentiment:** Identify the main sentiment in the text (e.g., positive, negative, neutral, happy, sad, angry, excited, etc.). Briefly explain why you identified it as such.
    2. **Tone:** Describe the candidate's tone (e.g., confident, hesitant, enthusiastic, professional, friendly, etc.). Provide specific evidence from the text to support your assessment.

    **Overall Assessment:**
    Provide a brief overall assessment of the candidate's response based on your sentiment and tone analysis. Does the response meet the job requirements and demonstrate a positive attitude?`;

    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4o',
      max_tokens: 256,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Error analyzing sentiment and tone');
  }
};

/**
 *
 * @param {string} userId
 * @param {string} applicationId
 * @param {string} questionId
 * @returns {Promise<string>}
 */
const getApplyAnswer = async (userId, applicationId, questionId) => {
  const application = await applyService.getApplication(applicationId);
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }

  const answer = await Answer.findOne({ owner: userId, ref: applicationId, question: questionId });
  if (!answer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Answer not found');
  }

  if (!application.answers?.some((item) => item.id === answer._id.toString())) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid answer');
  }

  return answer;
};

module.exports = {
  createAnswer,
  queryAnswers,
  getAnswer,
  submitAnswer,
  summarizeAudio,
  analyzeSentiment,
  getApplyAnswer,
};
