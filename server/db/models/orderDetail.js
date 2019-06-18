const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order')

const OrderDetail = db.define('orderDetail', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      notEmpty: true,
      min: 1,
      isInt: true
    }
  }
})

module.exports = OrderDetail
