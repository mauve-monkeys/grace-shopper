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
  image: {
    type: Sequelize.BLOB,
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
  size: {
    type: Sequelize.INTEGER,
    validate: {
      min: 4,
      max: 12
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
