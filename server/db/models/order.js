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

// Order.prototype.getProducts = function() {
//   return Order.findOne({
//     where: {
//       id: this.id
//     },
//     include: [{model: db.models.product}]
//   })
// }

// const calculateTotal = async order => {
//   const orderProducts = await order.getProducts()
//   console.log('orderProducts', orderProducts)
// }

// Order.beforeUpdate(calculateTotal)

module.exports = Order
