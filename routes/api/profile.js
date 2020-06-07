const express = require("express");
const router = express.Router();
const ProfileController = require("../../controllers/profile");
const { validateBody, schemas } = require("../../helpers/routeHelpers");
const passport = require("passport");
const passportJWT = passport.authenticate("jwt", { session: false });

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router
  .route("/me")
  .get(passportJWT, ProfileController.getAuthenticatedUserProfile);

// @route   POST api/profile
// @desc    Create or update users profile
// @access  Private
router
  .route("/")
  .post(
    validateBody(schemas.profileSchema),
    passportJWT,
    ProfileController.upsertUserProfile
  );

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.route("/").get(ProfileController.getAllProfiles);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.route("/user/:user_id").get(ProfileController.getProfileByUserId);

// @route   DELETE api/profile
// @desc    Delete profile & posts
// @access  Private
router.route("/").delete(passportJWT, ProfileController.deleteProfile);

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router
  .route("/experience")
  .put(
    validateBody(schemas.experienceSchema),
    passportJWT,
    ProfileController.addProfileExperience
  );

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router
  .route("/experience/:exp_id")
  .delete(passportJWT, ProfileController.deleteExperienceFromProfile);

// @route   POST api/profile/education
// @desc    Add profile education
// @access  Private
router
  .route("/education")
  .put(
    validateBody(schemas.educationSchema),
    passportJWT,
    ProfileController.addProfileEducation
  );

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router
  .route("/education/:edu_id")
  .delete(passportJWT, ProfileController.deleteEducationFromProfile);

// @route   GET api/profile/github/:username
// @desc    Get github user repositories
// @access  Public
router
  .route("/github/:username")
  .get(ProfileController.getGithubUserRepositories);

module.exports = router;
