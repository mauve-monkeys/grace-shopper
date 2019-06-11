// place associations here

const User = require('./user')
const Product = require('./product')

module.exports = {
  User,
  Product
}

//User.hasMany(Orders)
//Orders.belongTo(User)
//Orders.hasMany(Products)
//Products.hasMany(Orders)
//Users.hasMany(Products) through CART
//Products.hasMany(Users) through CART
