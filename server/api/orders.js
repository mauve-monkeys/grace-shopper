const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

//  api/orders

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const [cart, wasCreated] = await Order.findOrCreate({
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

router.put('/:userId/cart/add', async (req, res, next) => {
  try {
    const [order] = await Order.findOrCreate({
      where: {
        userId: +req.params.userId,
        status: 'pending'
      }
    })
    const product = await Product.findOne({
      where: {
        id: +req.body.productId
      }
    })
    if (!product) {
      res.status(404).send('Product not found')
    }
    await order.addProductCustom(product)
    res.status(201).send()
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId/cart/delete/:productId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {id: req.params.orderId}
    })
    const product = await Product.findOne({
      where: {id: req.params.productId}
    })
    await order.removeProductCustom(product)
    res.status(201).send()
  } catch (error) {
    next(error)
  }
})

router.put('/cart/submit/guest', async (req, res, next) => {
  try {
    //tbd
  } catch (err) {
    next(err)
  }
})

router.put('/cart/submit/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: +req.params.userId,
        status: 'pending'
      }
    })

    order.status = 'confirmed'

    await order.save()

    res.status(201).send(order)
  } catch (err) {
    next(err)
  }
})
