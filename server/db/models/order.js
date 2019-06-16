const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(['pending', 'confirmed', 'cancelled']),
    allowNull: false,
    defaultValue: 'pending'
  },
  total: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      min: 0,
      isInt: true
    },
    defaultValue: 0
  },
  orderSize: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      min: 0,
      isInt: true
    },
    defaultValue: 0
  }
})

Order.prototype.addProductCustom = async function(product) {
  try {
    await this.addProduct(product)
    this.total += product.dataValues.price
    await Order.update(
      {
        total: this.total
      },
      {
        where: {
          id: this.id
        }
      }
    )
    return this.total.price
  } catch (error) {
    console.log('custom add products not working')
    console.log(error)
  }
}

Order.prototype.removeProductCustom = async function(product) {
  try {
    await this.removeProduct(product)
    this.total -= product.dataValues.price
    await Order.update(
      {
        total: this.total
      },
      {
        where: {
          id: this.id
        }
      }
    )
    return this.total.price
  } catch (error) {
    console.log('custom remove products not working')
    console.log(error)
  }
}

module.exports = Order
