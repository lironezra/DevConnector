const axios = require("axios");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const { githubToken } = require("../config");

module.exports = {
  upsertUserProfile: async (req, res) => {
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body;

    const profileFields = {
      user: req.user.id,
      company,
      location,
      website: website === "" ? "" : website,
      bio,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(",").map((skill) => skill.trim()),
      status,
      githubusername,
    };

    // Build social object and add to profileFields
    const socialfields = { youtube, twitter, instagram, linkedin, facebook };

    for (const [key, value] of Object.entries(socialfields)) {
      if (value && value.length > 0) socialfields[key] = value;
    }
    profileFields.social = socialfields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );

      res.status(200).json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
  getAuthenticatedUserProfile: async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id,
      }).populate("user", ["name", "avatar"]);

      if (!profile) {
        return res
          .status(400)
          .json({ msg: "There is no profile for this user" });
      }

      res.status(200).json(profile);
    } catch (err) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },
  getAllProfiles: async (req, res) => {
    try {
      const profiles = await Profile.find().populate("user", [
        "name",
        "avatar",
      ]);
      res.status(200).json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
  getProfileByUserId: async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.user_id,
      }).populate("user", ["name", "avatar"]);

      if (!profile) return res.status(400).json({ msg: "Profile not found" });

      res.status(200).json(profile);
    } catch (err) {
      console.error(err.message);

      if (err.kind == "ObjectId") {
        return res.status(400).json({ msg: "Profile not found" });
      }

      res.status(500).send("Server error");
    }
  },
  getGithubUserRepositories: async (req, res) => {
    try {
      const uri = encodeURI(
        `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
      );
      const headers = {
        "user-agent": "node.js",
        Authorization: `token ${githubToken}`,
      };

      const gitHubResponse = await axios.get(uri, { headers });

      return res.json(gitHubResponse.data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
  addProfileExperience: async (req, res) => {
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      // Get the profile we want add experience to
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  addProfileEducation: async (req, res) => {
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      // Get the profile we want add experience to
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEducation);

      await profile.save();

      res.status(200).json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  deleteProfile: async (req, res) => {
    try {
      // Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });

      // Remove user
      //await User.findOneAndRemove({ _id: req.user.id });

      res.status(200).json({
        msg:
          "Profile deleted, but you can create another profile if you want :)",
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
  deleteExperienceFromProfile: async (req, res) => {
    try {
      // Get the profile we want delete experience from
      const foundProfile = await Profile.findOne({ user: req.user.id });

      foundProfile.experience = foundProfile.experience.filter(
        (exp) => exp._id.toString() !== req.params.exp_id
      );

      await foundProfile.save();
      return res.status(200).json(foundProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
  deleteEducationFromProfile: async (req, res) => {
    try {
      // Get the profile we want delete experience from
      const foundProfile = await Profile.findOne({ user: req.user.id });

      foundProfile.education = foundProfile.education.filter(
        (edu) => edu._id.toString() !== req.params.edu_id
      );

      await foundProfile.save();
      return res.status(200).json(foundProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
};
