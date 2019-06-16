'use strict'
const faker = require('faker')
const db = require('../server/db')

function generateProducts(num) {
  let productId = 1
  const products = new Array(num).fill({}).map(product => {
    const name = faker.commerce.productName()
    const description = faker.commerce.productAdjective()
    const imageUrl = 'https://loremflickr.com/320/240/dog'
    const price = faker.commerce.price()
    const SKU = ++productId

    return {
      name,
      description,
      imageUrl,
      price,
      SKU
    }
  })
  return products
}

function generateUsers(num) {
  const users = new Array(num).fill({}).map(user => {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const phoneNumber = faker.phone.phoneNumber()
    const shippingAddress = `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.zipCode()}`
    const billingAddress = `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.zipCode()}`
    return {
      firstName,
      lastName,
      phoneNumber,
      shippingAddress,
      billingAddress,
      email: `${firstName}.${lastName}@example.com`,
      password: '1234',
      username: `${firstName}${lastName[0]}`
    }
  })
  return users
}

async function createOrders(num, products, users) {
  // const orders = await db.models.order.bulkCreate(new Array(num).fill({}))
  // let randInt = Math.floor(Math.random() * products.length)
  // await orders.addProduct(products[randInt])
  const order = await db.models.order.create({})
  await order.addProductCustom(products[0])
  await order.addProductCustom(products[1])
  await users[0].addOrder(order)

  const order2 = await db.models.order.create({
    status: 'confirmed'
  })
  await order2.addProductCustom(products[1])
  await order2.addProductCustom(products[2])
  await users[1].addOrder(order2)
}

async function seed(numProducts, numUsers) {
  await db.sync({force: true})
  console.log('db synced!')

  const userData = generateUsers(numUsers)
  const users = []

  for (let i = 0; i < userData.length; i++) {
    let user = await db.models.user.create(userData[i])
    users.push(user)
  }

  const productData = generateProducts(numProducts)
  const products = []

  for (let i = 0; i < productData.length; i++) {
    let product = await db.models.product.create(productData[i])
    products.push(product)
  }

  await createOrders(2, products, users)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed(5, 5)
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
