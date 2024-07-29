const mongoose = require('mongoose');
const moment = require('moment');
const { Log, Apply, Answer, Job } = require('../models');

const getConversionRateData = async (jobId, startDate, endDate, granularity) => {
  let format = '%Y-%m-%d';
  if (granularity === 'month') {
    format = '%Y-%m';
  } else if (granularity === 'year') {
    format = '%Y';
  }

  const views = await Log.aggregate([
    {
      $match: {
        ref: jobId,
        type: 'view',
        $and: [{ createdAt: { $gte: new Date(startDate) } }, { createdAt: { $lte: new Date(endDate) } }],
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format,
            date: '$createdAt',
          },
        },
        count: { $sum: 1 },
      },
    },
  ]);
  const applications = await Apply.aggregate([
    {
      $match: {
        job: new mongoose.Types.ObjectId(jobId),
        $and: [{ createdAt: { $gte: new Date(startDate) } }, { createdAt: { $lte: new Date(endDate) } }],
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format,
            date: '$createdAt',
          },
        },
        count: { $sum: 1 },
      },
    },
  ]);

  const conversionRateData = Array(views)
    .sort((a, b) => {
      return moment(a.time).diff(b.time);
    })
    .map((view) => {
      const application = applications.find((app) => app._id === view._id);
      return {
        time: view._id,
        views: view.count,
        applications: application?.count ?? 0,
        conversionRate: ((application?.count ?? 0) / (view.count || 1)) * 100,
      };
    });

  return conversionRateData;
};

const getSubmitTimeData = async (jobId) => {
  const applications = await Apply.find({
    job: jobId,
  });
  const average =
    applications.reduce((acc, curr) => acc + moment(curr.timeToSubmit || moment()).diff(curr.createdAt, 'seconds'), 0) /
    (applications.length || 1);

  const job = await Job.findById(jobId);
  const { questions } = job;
  const answers = await Answer.aggregate([
    {
      $match: {
        question: {
          $in: questions,
        },
      },
    },
    {
      $group: {
        _id: '$question',
        average: { $avg: '$submitSeconds' },
      },
    },
    {
      $lookup: {
        from: 'questions',
        localField: '_id',
        foreignField: '_id',
        as: 'question',
      },
    },
    {
      $unwind: {
        path: '$question',
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  const data = {
    average,
    questions: answers,
  };

  return data;
};

module.exports = {
  getConversionRateData,
  getSubmitTimeData,
};
