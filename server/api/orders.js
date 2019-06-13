const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

//  api/orders

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: +req.params.userId,
        status: 'pending'
      },
      include: [{model: Product}]
    })
    if (!cart) {
      res.status(404).send()
    } else {
      res.json(cart)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const orders = await User.findOne({
      where: {
        id: +req.params.userId
      },
      include: [
        {
          model: Order,
          include: [
            {
              model: Product
            }
          ]
        }
      ]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})
