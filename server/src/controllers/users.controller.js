const UserModel = require('../models/user.model');

const usersController = {};

usersController.getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send('Error gerring users', error);
  }
};

usersController.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userFound = await UserModel.findById(id);

    if (!userFound) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send(userFound);
  } catch (error) {
    res.status(500).send({ message: 'Error getting user' + error });
  }
};

usersController.createUser = async (req, res) => {
  const newUser = new UserModel({ ...req.body });
  try {
    await newUser.save();
    const allUsers = await UserModel.find();
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send({ message: 'Error getting users' + error });
  }
};

usersController.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.updateOne({ _id: id }, { $set: { ...req.body } });
    //importante que reciba objetos
    const allUsers = await UserModel.find();
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send({ message: 'Error updating users' + error });
  }
};

usersController.deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    await UserModel.deleteOne({ _id: id });
    //importante que reciba objetos
    const allUsers = await UserModel.find();
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send({ message: 'Error deleting users' + error });
  }
};

module.exports = usersController;
