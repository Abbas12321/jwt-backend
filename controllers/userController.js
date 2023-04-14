const User = require('../models/User');

const userController = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find();

      return res.status(200).json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async createUser(req, res) {
    try {
      const { name, email } = req.body;

      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const user = new User({
        name,
        email,
      });

      await user.save();

      return res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userExists = await User.findOne({ email });

      if (userExists && userExists._id.toString() !== id) {
        return res.status(409).json({ message: 'User with this email already exists' });
      }

      user.name = name;
      user.email = email;

      await user.save();

      return res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.remove();

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = userController;
