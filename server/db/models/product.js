const Sequelize = require('sequelize')
const db = require('../db')

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
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
      isInt: true
    },
    get() {
      return this.getDataValue('price') / 100
    },
    set(priceDecimal) {
      this.setDataValue('price', priceDecimal * 100)
    }
  },
  SKU: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  stone: {
    type: Sequelize.ENUM(['diamond', 'ruby'])
  },
  band: {
    type: Sequelize.ENUM(['silver', 'gold'])
  },
  size: {
    type: Sequelize.ENUM([
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13'
    ])
  }
})

module.exports = Product
