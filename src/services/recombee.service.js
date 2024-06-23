const { client, rqs } = require('../config/recombeeClient');
const logger = require('../config/logger');
const { Job, Organization, User } = require('../models');
const flattenPlatejsData = require('../utils/flattenPlatejsData');

const recommendJobs = async (userId, limit = 10, page = 1) => {
  try {
    const user = await User.findById(userId).lean(); // Fetch the user profile

    // Initialize boosting conditions based on available user attributes
    const boosters = [];
    if (user.skills && user.skills.length > 0) {
      boosters.push(`(if ('skills' in ${JSON.stringify(user.skills || [])}) then 1.5 else 1)`);
    }
    if (user.tools && user.tools.length > 0) {
      boosters.push(`(if ('tools' in ${JSON.stringify(user.tools || [])}) then 1.5 else 1)`);
    }
    if (user.location) {
      boosters.push(`(if ('location' == "${user.location}") then 1.2 else 1.0)`);
    }

    // Join boosters with multiplication to create a combined booster string
    const booster = boosters.length > 0 ? boosters.join(' * ') : undefined;

    const recommendations = await client.send(
      new rqs.RecommendItemsToUser(userId.toString(), limit, {
        scenario: 'job_recommendation',
        cascadeCreate: true,
        returnProperties: true,
        page,
        ...(booster && {
          booster,
        }),
      })
    );

    const jobIds = recommendations.recomms.map((r) => r.id);
    return Job.find({ _id: { $in: jobIds } })
      .populate('org')
      .populate('owner');
  } catch (error) {
    logger.error('Error getting job recommendations:', error);
  }
};

const recommendOrganizations = async (userId, limit = 10, page = 1) => {
  try {
    const recommendations = await client.send(
      new rqs.RecommendItemsToUser(userId.toString(), limit, {
        scenario: 'organization_recommendation',
        cascadeCreate: true,
        returnProperties: true,
        diversity: 0,
        page,
      })
    );
    const orgIds = recommendations.recomms.map((r) => r.id);
    return Organization.find({ _id: { $in: orgIds } });
  } catch (error) {
    logger.error('Error getting organization recommendations:', error);
  }
};

const recommendCandidates = async (jobId, limit = 10, page = 1) => {
  try {
    const recommendations = await client.send(
      new rqs.RecommendUsersToItem(jobId.toString(), limit, {
        cascadeCreate: true,
        returnProperties: true,
        page,
      })
    );
    const userIds = recommendations.recomms.map((r) => r.id);
    return User.find({ _id: { $in: userIds } });
  } catch (error) {
    logger.error('Error getting candidate recommendations:', error);
  }
};

const sendInteraction = async (userId, itemId, interactionType) => {
  try {
    let req;
    if (interactionType === 'view') {
      // req = new rqs.AddDetailView(userId, itemId, {
      //   cascadeCreate: true,
      //   timestamp: new Date(),
      // });
    } else if (interactionType === 'bookmark') {
      req = new rqs.AddBookmark(userId, itemId, {
        cascadeCreate: true,
        timestamp: new Date(),
      });
    }

    await client.send(req);
  } catch (error) {
    logger.error(`Error sending ${interactionType} interaction to Recombee:`, error);
  }
};

const addJobToRecombee = async (job) => {
  try {
    let { description } = job;
    try {
      description = flattenPlatejsData(job.description);
    } catch (error) {
      // Do nothing
    }
    const req = new rqs.SetItemValues(
      job.id.toString(),
      {
        title: job.title,
        description,
        location: job.location,
        salaryFrom: job.salaryFrom,
        salaryTo: job.salaryTo,
        experience: job.experience,
        skills: job.skills,
        tools: job.tools,
        org: job.org.toString(),
        type: 'job',
      },
      {
        cascadeCreate: true,
      }
    );

    await client.send(req);
  } catch (error) {
    logger.error('Error adding job to Recombee:', error);
  }
};

const recommendUsers = async (userId, limit = 10, page = 1) => {
  try {
    const recommendations = await client.send(
      new rqs.RecommendUsersToUser(userId.toString(), limit, {
        returnProperties: true,
        scenario: 'users_recommendation',
        page,
        // booster: `if "skills" in item then 2 else 1 + if "tools" in item then 2 else 1`,
      })
    );
    const userIds = recommendations.recomms.map((r) => r.id);
    return User.find({ _id: { $in: userIds } });
  } catch (error) {
    logger.error('Error getting user recommendations:', error);
  }
};

const addOrganizationToRecombee = async (organization) => {
  try {
    const req = new rqs.SetItemValues(
      organization.id.toString(),
      {
        name: organization.name,
        description: organization.description,
        field: organization.field,
        location: organization.location,
        website: organization.website,
        type: 'organization',
      },
      {
        cascadeCreate: true,
      }
    );

    await client.send(req);
  } catch (error) {
    logger.error('Error adding organization to Recombee:', error);
  }
};

const addUserToRecombee = async (user) => {
  try {
    // Extracting relevant fields from experiences
    const experiences = user.experiences.map((exp) => ({
      title: exp.title || '',
      company: exp.company || '',
      description: exp.description || '',
    }));

    const userValues = {
      skills: user.skills || [],
      tools: user.tools || [],
      experience: experiences,
      location: user.location || '',
    };

    const req = new rqs.SetUserValues(user.id.toString(), userValues, {
      cascadeCreate: true,
    });

    await client.send(req);
  } catch (error) {
    logger.error('Error adding user to Recombee:', error);
  }
};

const updateJobInRecombee = async (job) => {
  await addJobToRecombee(job); // Using the same method to add/update
};

const updateOrganizationInRecombee = async (organization) => {
  await addOrganizationToRecombee(organization); // Using the same method to add/update
};

const updateUserInRecombee = async (user) => {
  await addUserToRecombee(user); // Using the same method to add/update
};

const addUserPropertiesToRecombee = async () => {
  try {
    const addSkillsProperty = new rqs.AddUserProperty('skills', 'set');
    const addToolsProperty = new rqs.AddUserProperty('tools', 'set');
    const addLocationProperty = new rqs.AddUserProperty('location', 'string');
    const addExperienceProperty = new rqs.AddUserProperty('experience', 'string');

    await client.send(addSkillsProperty);
    await client.send(addToolsProperty);
    await client.send(addLocationProperty);
    await client.send(addExperienceProperty);

    logger.info('Successfully added user properties to Recombee');
  } catch (error) {
    logger.error('Error adding user properties to Recombee:', error);
  }
};

// Function to add job and organization properties to Recombee
const addEntityPropertiesToRecombee = async () => {
  try {
    const addTitleProperty = new rqs.AddItemProperty('title', 'string');
    const addDescriptionProperty = new rqs.AddItemProperty('description', 'string');
    const addLocationProperty = new rqs.AddItemProperty('location', 'string');
    const addSalaryFromProperty = new rqs.AddItemProperty('salaryFrom', 'string');
    const addSalaryToProperty = new rqs.AddItemProperty('salaryTo', 'string');
    const addExperienceProperty = new rqs.AddItemProperty('experience', 'string');
    const addSkillsProperty = new rqs.AddItemProperty('skills', 'set');
    const addToolsProperty = new rqs.AddItemProperty('tools', 'set');
    const addOrgProperty = new rqs.AddItemProperty('org', 'string');
    const addTypeProperty = new rqs.AddItemProperty('type', 'string');

    const addNameProperty = new rqs.AddItemProperty('name', 'string');
    const addFieldProperty = new rqs.AddItemProperty('field', 'string');
    const addWebsiteProperty = new rqs.AddItemProperty('website', 'string');

    await client.send(addTitleProperty);
    await client.send(addDescriptionProperty);
    await client.send(addLocationProperty);
    await client.send(addSalaryFromProperty);
    await client.send(addSalaryToProperty);
    await client.send(addExperienceProperty);
    await client.send(addSkillsProperty);
    await client.send(addToolsProperty);
    await client.send(addOrgProperty);
    await client.send(addTypeProperty);

    await client.send(addNameProperty);
    await client.send(addFieldProperty);
    await client.send(addWebsiteProperty);

    logger.info('Successfully added entity properties to Recombee');
  } catch (error) {
    logger.error('Error adding entity properties to Recombee:', error);
  }
};

module.exports = {
  recommendJobs,
  recommendOrganizations,
  recommendCandidates,
  sendInteraction,
  addJobToRecombee,
  addOrganizationToRecombee,
  addUserToRecombee,
  updateJobInRecombee,
  updateOrganizationInRecombee,
  updateUserInRecombee,
  addUserPropertiesToRecombee,
  addEntityPropertiesToRecombee,
  recommendUsers,
};
