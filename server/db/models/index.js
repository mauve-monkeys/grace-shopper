// place associations here

const User = require('./user')
const OrderDetail = require('./orderDetail')
const Product = require('./product')
const Order = require('./order')

module.exports = {
  User,
  Product,
  Order,
  OrderDetail
}

User.hasMany(Order)
Order.belongsTo(User)
Order.belongsToMany(Product, {
  through: OrderDetail,
  onDelete: 'cascade',
  hooks: true
})
Product.belongsToMany(Order, {
  through: OrderDetail,
  onDelete: 'cascade',
  hooks: true
})
