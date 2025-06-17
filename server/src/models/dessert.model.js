const mongoose = require('mongoose');

const dessertSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    title: String,
    price: Number,
    stock: Number,
    imgMobile: String,
    imgTablet: String,
    imgDesktop: String,
    imgThumbnail: String,
    alt: String
  },
  { timestamps: true, collection: 'desserts' }
);

const DessertModel = mongoose.model('Dessert', dessertSchema);
module.exports = DessertModel;
