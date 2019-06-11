const Sequelize = require('sequelize')
const db = require('../db')

const colors = ['silver', 'gold', 'black', 'red']

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
    // defaultValue: ''
  },
  price: {
    type: Sequelize.FLOAT,
    allow: false,
    validate: {
      notEmpty: true
    }
  },
  SKU: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  color: {
    type: Sequelize.ENUM('Selection'),
    values: colors
  },
  material: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
})

module.exports = Product
