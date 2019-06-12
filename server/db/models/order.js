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

// const calculateTotal = (order) => {
//     order.total =
// }

//Order.beforeCreate

module.exports = Order
