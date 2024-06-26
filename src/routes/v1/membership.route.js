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

router
  .route('/:id')
  .get(validate(membershipValidation.getMembership), membershipController.getMembership)
  .patch(auth(), validate(membershipValidation.updateMembership), membershipController.updateMembership)
  .delete(auth(), validate(membershipValidation.deleteMembership), membershipController.deleteMembership);

router.route('/user/:userId').get(membershipController.getUserMemberships);

router.route('/org/:orgId').get(auth('getMemberships'), membershipController.getOrganizationMemberships);

router.route('/:invitationToken/accept').post(auth(), membershipController.acceptInvitation);

router.route('/:invitationToken/reject').post(auth(), membershipController.rejectInvitation);

module.exports = router;
