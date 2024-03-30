const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const organizationValidation = require('../../validations/organization.validation');
const organizationController = require('../../controllers/organization.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(organizationValidation.createOrganization), organizationController.createOrganization)
  .get(auth(), validate(organizationValidation.getOrganizations), organizationController.getOrganizations);

router.route('/verify-creation').get(organizationController.verifyCreation);

router
  .route('/:organizationId')
  .get(auth(), organizationController.getOrganization)
  .patch(auth(), validate(organizationValidation.updateOrganization), organizationController.updateOrganization)
  .delete(auth(), validate(organizationValidation.getOrganization), organizationController.deleteOrganization);

module.exports = router;
