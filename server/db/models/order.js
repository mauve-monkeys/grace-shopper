const Sequelize = require('sequelize')
const db = require('../db')
// const Product = require('./product')
// const OrderDetail = require('./orderDetail')

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
    const orderDetail = await this.addProduct(product)
    this.total += product.dataValues.price * orderDetail[0].dataValues.quantity
    this.orderSize += orderDetail[0].dataValues.quantity
    await Order.update(
      {
        total: this.total,
        orderSize: this.orderSize
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
    const orderDetail = await this.removeProduct(product)
    this.total -= product.dataValues.price * orderDetail[0].dataValues.quantity
    this.orderSize -= orderDetail[0].dataValues.quantity
    await Order.update(
      {
        total: this.total,
        orderSize: this.orderSize
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
