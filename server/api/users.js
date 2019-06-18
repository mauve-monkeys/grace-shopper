const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      }
    })
    res.json(user)
  } catch (error) {
    next(err)
  }
})

router.put('/:userId/edit', async (req, res, next) => {
  try {
    await User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        shippingAddress: req.body.shippingAddress,
        billingAddress: req.body.billingAddress
      },
      {
        where: {id: req.params.userId}
      }
    )
  } catch (error) {
    next(error)
  }
})
