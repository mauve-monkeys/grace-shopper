const router = require('express').Router()
const {User, Order, Product, OrderDetail} = require('../db/models')
module.exports = router

// mounted on api/orderDetails
router.put('/quantity/:orderId/:productId', async (req, res, next) => {
  try {
    const [num, newOrderDetail] = await OrderDetail.update(
      {
        quantity: req.body.quantity
      },
      {
        where: {
          orderId: +req.params.orderId,
          productId: +req.params.productId
        },
        returning: true,
        plain: true
      }
    )

    res.json(newOrderDetail)
  } catch (err) {
    next(err)
  }
})
