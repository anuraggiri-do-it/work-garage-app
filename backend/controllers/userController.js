const User = require('../models/User');

const getProfile = async (req, res) => {
  let user = await User.findOne();
  if (!user) {
    user = await User.create({ name: 'User', email: 'user@example.com' });
  }
  res.json(user);
};

const updateProfile = async (req, res) => {
  let user = await User.findOne();
  if (!user) {
    user = await User.create(req.body);
  } else {
    Object.assign(user, req.body);
    await user.save();
  }
  res.json(user);
};

module.exports = { getProfile, updateProfile };
