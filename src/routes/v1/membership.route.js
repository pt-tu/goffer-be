const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const membershipValidation = require('../../validations/membership.validation');
const membershipController = require('../../controllers/membership.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(membershipValidation.createMembership), membershipController.createMembership)
  .get(validate(membershipValidation.getMemberships), membershipController.getMemberships);

router.route('/self').get(auth(), membershipController.getSelfMemberships);

router
  .route('/:id')
  .get(validate(membershipValidation.getMembership), membershipController.getMembership)
  .patch(auth(), validate(membershipValidation.updateMembership), membershipController.updateMembership)
  .delete(auth(), validate(membershipValidation.deleteMembership), membershipController.deleteMembership);

router
  .route('/org/:orgId')
  .get(validate(membershipValidation.getOrganizationMemberships), membershipController.getOrganizationMemberships);

router.route('/accept').post(auth(), validate(membershipValidation.replyInvitation), membershipController.acceptInvitation);

router.route('/reject').post(auth(), validate(membershipValidation.replyInvitation), membershipController.rejectInvitation);

module.exports = router;
