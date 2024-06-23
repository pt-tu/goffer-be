const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { recombeeController, userController, organizationController, jobController } = require('../../controllers');
const { recombeeValidation, userValidation, jobValidation, organizationValidation } = require('../../validations');

const router = express.Router();

router.get('/users', auth(), validate(userValidation.getUsers), userController.recommendUsers);
router.get('/jobs', auth(), validate(jobValidation.getJobs), jobController.recommendJobs);
router.get(
  '/organizations',
  auth(),
  validate(organizationValidation.getOrganizations),
  organizationController.recommendOrganizations
);
router.get('/candidates/:jobId', auth(), validate(userValidation.getUsers), userController.recommendCandidates);
router.post('/interact/:itemId', auth(), validate(recombeeValidation.interactWithItem), recombeeController.interactWithItem);

module.exports = router;
