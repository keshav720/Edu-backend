const db = require('../models');
const UserTest = db.UserTest;

exports.createUserTest = async (req, res) => {
  try {
    const userTest = await UserTest.create(req.body);
    res.status(201).json(userTest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUserTests = async (req, res) => {
  try {
    const userTests = await UserTest.findAll({
      include: [{ model: db.User, as: 'User' }, { model: db.Test, as: 'Test' }]
    });
    res.status(200).json(userTests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserTestById = async (req, res) => {
  try {
    const userTest = await UserTest.findByPk(req.params.id, {
      include: [{ model: db.User, as: 'User' }, { model: db.Test, as: 'Test' }]
    });
    if (userTest) {
      res.status(200).json(userTest);
    } else {
      res.status(404).json({ error: 'UserTest not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUserTest = async (req, res) => {
  try {
    const [updated] = await UserTest.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedUserTest = await UserTest.findByPk(req.params.id);
      res.status(200).json(updatedUserTest);
    } else {
      res.status(404).json({ error: 'UserTest not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUserTest = async (req, res) => {
  try {
    const deleted = await UserTest.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'UserTest not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
