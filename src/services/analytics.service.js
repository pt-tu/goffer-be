const mongoose = require('mongoose');
const { Log, Apply } = require('../models');

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

  const conversionRateData = views.map((view) => {
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

module.exports = {
  getConversionRateData,
};
