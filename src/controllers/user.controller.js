const User = require('../models/user.model');

exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, phonenumber, bonus } = req.body;
    await User.create({ firstname, lastname, phonenumber, bonus });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Error fetching user' });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json({
        firstName: user.firstname,
        lastName: user.lastname,
        phoneNumber: user.phonenumber,
        bonus: user.bonus
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Error fetching user details' });
  }
};
