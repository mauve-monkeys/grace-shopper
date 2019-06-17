const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      }
    })

    if (product === undefined) {
      return res.sendStatus(404)
    }
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.put('/add', async (req, res, next) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      SKU: req.body.SKU
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})
