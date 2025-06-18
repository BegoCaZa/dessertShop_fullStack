const DessertModel = require('../models/dessert.model');

const dessertsController = {};

dessertsController.getAllDesserts = async (req, res) => {
  try {
    const allDesserts = await DessertModel.find();
    res.status(200).send(allDesserts);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error getting desserts', error: error.message });
  }
};

dessertsController.getDessertById = async (req, res) => {
  const { id } = req.params;
  try {
    const dessertFound = await DessertModel.findById(id);

    if (!dessertFound) {
      return res.status(404).send({ message: 'Dessert not found' });
    }
    return res.status(200).send(dessertFound);
  } catch (error) {
    res.status(500).send({ message: 'Error getting dessert' + error });
  }
};

// usersController.createUser = async (req, res) => {
//   const newUser = new UserModel({ ...req.body });
//   try {
//     await newUser.save();
//     const allUsers = await UserModel.find();
//     res.status(200).send(allUsers);
//   } catch (error) {
//     res.status(500).send({ message: 'Error getting users' + error });
//   }
// };

dessertsController.updateStock = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body; // el monto a restar stock
  try {
    dessertFound = await DessertModel.findById(id);
    if (!dessertFound) {
      return res.status(404).send({ message: 'Dessert not found' });
    }
    if (dessertFound.stock < quantity) {
      return res.status(400).send({ message: 'Not enough stock' });
    }
    dessertFound.stock -= quantity; // resta el stock
    await dessertFound.save(); // guarda los cambios
    //importante que reciba objetos
    const allDesserts = await DessertModel.find();
    res.status(200).send(allDesserts);
  } catch (error) {
    res.status(500).send({ message: 'Error updating users' + error });
  }
};

dessertsController.deleteDessert = async (req, res) => {
  const { id } = req.params;

  try {
    await DessertModel.deleteOne({ _id: id });
    //importante que reciba objetos
    const allDesserts = await DessertModel.find();
    res.status(200).send(allDesserts);
  } catch (error) {
    res.status(500).send({ message: 'Error deleting desserts' + error });
  }
};

module.exports = dessertsController;
