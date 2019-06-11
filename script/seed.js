'use strict'
const faker = require('faker')
const db = require('../server/db')

function generateProducts(num) {
  let productId = 1
  const products = new Array(num).fill({}).map(product => {
    const name = faker.commerce.productName()
    const description = faker.commerce.productAdjective()
    const image = faker.image.abstract()
    const price = faker.commerce.price()
    const SKU = ++productId
    const size = 4 + Math.round(Math.random() * (12 - 4))

    return {
      name,
      description,
      image,
      price,
      SKU,
      size
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

async function seed(numProducts, numUsers) {
  await db.sync({force: true})
  console.log('db synced!')

  const users = generateUsers(numUsers)

  for (let i = 0; i < users.length; i++) {
    await db.models.user.create(users[i])
  }

  const products = generateProducts(numProducts)

  for (let i = 0; i < products.length; i++) {
    await db.models.product.create(products[i])
  }

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length}`)
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
