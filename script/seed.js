'use strict'
// const faker = require('faker')
const db = require('../server/db')
// const Product = require('../server/db/models/product')
// const User = require('../server/db/models/user')

const productsData = [
  {
    name: 'Sparkling Wishbone Ring',
    description:
      'Make all your wishes come true with this delicate ring, crafted from sterling silver and lined with sparkling cubic zirconia stones. Simple yet elegant, this wishbone-shaped ring can be worn on its own as a shimmering statement, or paired with other stackable rings to create a unique, highly individual look.',
    imageUrl:
      'https://www.becharming.com/media/catalog/product/cache/1/image/750x750/9df78eab33525d08d6e5fb8d27136e95/b/e/beaded_wish_ring-196315.jpg',
    price: 1,
    SKU: 1,
    stone: 'diamond',
    band: 'silver',
    size: '6'
  },
  {
    name: 'Flower Crown Ring',
    description:
      'Decorate fingers with this dazzling ring in gold rose. Shaped as a flower garland, the blush-pink design sparkles with clear stones. Stack with similar designs or wear solo as a subtle statement.',
    imageUrl:
      'https://www.lk-laluna.com/media/catalog/product/cache/1/image/040ec09b1e35df139433887a97daa66f/6/0/6058-800.jpg',
    price: 1,
    SKU: 2,
    stone: 'ruby',
    band: 'gold',
    size: '6'
  },
  {
    name: 'Princess Tiara Ring',
    description:
      'Fit for a modern fairy tale, this ring in 18K gold-plated sterling silver boasts a tiara with a heart and a brilliant cubic zirconia stone. It will make you feel like a princess every day.',
    imageUrl:
      'https://d1tvmw30728evr.cloudfront.net/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/b/k/bk909036.jpg',
    price: 1,
    SKU: 3,
    stone: 'diamond',
    band: 'silver',
    size: '6'
  },
  {
    name: 'Heart of Winter Ring',
    description:
      'Declare your love for the winter season with this chic sterling silver statement ring. Its embellished heart design is abstract and delicate at the same time, thanks to its shimmering cubic zirconia ice ruby motif.',
    imageUrl: 'https://i.ebayimg.com/images/g/Tr4AAOSwMqBaXUZE/s-l300.jpg',
    price: 1,
    SKU: 4,
    stone: 'diamond',
    band: 'silver',
    size: '6'
  },
  {
    name: 'Simple Band Ring',
    description:
      'Add a subtle touch of sparkle to every outfit with this eternity ring, crafted in polished rose gold – a 14k rose gold-plated unique metal blend. Simple yet stylish, this classic style is embellished with shimmering cubic zirconia stones. Elegant on its own, it looks exceptional when stacked with other rings in contrasting metal tones.',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51bCuQCERqL._UX522_.jpg',
    price: 1,
    SKU: 5,
    stone: 'diamond',
    band: 'gold',
    size: '6'
  },
  {
    name: 'Regal Beauty Ring',
    description:
      'Perfect for stacking, the royal-inspired pattern on this ring is unique and sophisticated. It turns a classic band into an eye-catching essential.',
    imageUrl: 'https://www.jared.com/images/products/8024/802441509_MV_ZM.jpg',
    price: 1,
    SKU: 6,
    stone: 'ruby',
    band: 'gold',
    size: '6'
  },
  {
    name: 'Radiant Teardrop Ring',
    description:
      'This ultra-glamorous statement ring in will cast glorious light on your fingers, courtesy of its beautiful teardrop-shaped cubic zirconia stone.',
    imageUrl:
      'https://www.reeds.com/pub/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/p/a/pandora_rose_radiant_teardrop_ring_clear_cubic_zirconia-1-186251cz-t1559105710.jpg',
    price: 1,
    SKU: 7,
    stone: 'diamond',
    band: 'gold',
    size: '6'
  },
  {
    name: 'Dazzling Droplet Ring',
    description:
      'Nothing less than absolutely dazzling, this sterling silver ring features pavé-set stones on a central dome. Reflecting the beautiful light effect of a water droplet, this striking ring looks best when stacked with the other rings in the Droplets series.',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/5123oDEdRcL._UL1000_.jpg',
    price: 1,
    SKU: 8,
    stone: 'diamond',
    band: 'silver',
    size: '6'
  },
  {
    name: ' Sparkling Red Heart Ring',
    description:
      "Set your heart on fire with this sparkling heart ring. Crafted in sterling silver, this stunning solitaire ring features a heart-shaped cubic zirconia stone in ruby red, flanked by two shimmering stones. A beautiful gift for Valentine's Day, birthdays, and anniversaries, it is the perfect expression of love. Let it shine solo or stack it with other rings.",
    imageUrl:
      'https://www.inspiredsilver.com/media/catalog/product/cache/1/image/538x538/9df78eab33525d08d6e5fb8d27136e95/2/0/20765.jpg',
    price: 1,
    SKU: 9,
    stone: 'ruby',
    band: 'silver',
    size: '6'
  },
  {
    name: 'Sparkling Elegance Ring',
    description:
      'A trio of striking stones decorates this elegant ring in gold Rose. The blush-pink design has a vintage feel, and is perfect for wear alone or in ring stacks.',
    imageUrl:
      'https://www.becharming.com/media/catalog/product/cache/1/image/750x750/9df78eab33525d08d6e5fb8d27136e95/r/a/radiant_elegance_ring_rose-180986cz.jpg',
    price: 1,
    SKU: 10,
    stone: 'diamond',
    band: 'gold',
    size: '6'
  },
  {
    name: 'Hearts of Eternity Ring',
    description:
      'Show that your love is forever with this classic shine eternity ring in 18K gold-plated sterling silver. Its golden color, cut-out hearts and clear cubic zirconia stones make it a fabulous stacking ring.',
    imageUrl: 'https://www.denmarkstyle.net/images/enlarged/180963CZ.jpg',
    price: 1,
    SKU: 11,
    stone: 'diamond',
    band: 'gold',
    size: '6'
  },
  {
    name: 'Twist Of Fate Stackable Ring',
    description:
      'Two rows of clear sparkling cubic zirconias entwine in this sterling silver ring, representing how your lives are connected. Beautiful alone and also stacked with your favorite rings.',
    imageUrl:
      'http://www.burwoodproduce.co.nz/images/cate_2/640/ROCKART-Real-925-Sterling-Silver-Braided-Pave-Silver-Ring-With-Clear-CZ-Twist-Of-Fate-Stackable-Twisted-Ring-For-Women-Gift-KGIG30977-gyl0.jpg',
    price: 1,
    SKU: 12,
    stone: 'diamond',
    band: 'silver',
    size: '6'
  }
]

const usersData = [
  {
    username: 'cara.t',
    email: 'cara.t@gmail.com',
    password: 'kitty',
    googleId: '',
    firstName: 'Cara',
    lastName: 'Takemoto',
    billingAddress: '123 terrace st, New York, NY 12345',
    shippingAddress: '123 terrace st, New York, NY 12345',
    phoneNumber: '666',
    isAdmin: true
  },
  {
    username: 'maddie.e',
    email: 'maddie.e@gmail.com',
    password: 'lab',
    googleId: '',
    firstName: 'Madeline',
    lastName: 'Emde',
    billingAddress: '6789 prince st, Orlando, FL 58364',
    shippingAddress: '6789 prince st, Orlando, FL 58364',
    phoneNumber: '1275983023',
    isAdmin: true
  },
  {
    username: 'nikki.b',
    email: 'nikki.b@gmail.com',
    password: 'pitbull',
    googleId: '',
    firstName: 'Nikki',
    lastName: 'Bergamini',
    billingAddress: '235 grey st, Nevada, Las Vegas 3467',
    shippingAddress: '634 yellow st, Nevada, Las Vegas 2457',
    phoneNumber: ''
  },
  {
    username: 'kistina.g',
    email: 'kistina.g@gmail.com',
    password: 'goldendoddle',
    googleId: '',
    firstName: 'Kistina',
    lastName: 'Gurung',
    billingAddress: '726 bowery drive, Palisades Park, NJ 2563',
    shippingAddress: '2353 canal st, Leonia, New Jersey 778',
    phoneNumber: ''
  }
]

async function createOrders(num, products, users) {
  // const orders = await db.models.order.bulkCreate(new Array(num).fill({}))
  // let randInt = Math.floor(Math.random() * products.length)
  // await orders.addProduct(products[randInt])
  const order = await db.models.order.create({})
  await order.addProduct(products[0])
  await order.addProduct(products[1])
  await users[0].addOrder(order)

  const order2 = await db.models.order.create({
    status: 'confirmed'
  })
  await order2.addProduct(products[1])
  await order2.addProduct(products[2])
  await users[1].addOrder(order2)
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = []

  for (let i = 0; i < usersData.length; i++) {
    let user = await db.models.user.create(usersData[i])
    users.push(user)
  }

  const products = []

  for (let i = 0; i < productsData.length; i++) {
    let product = await db.models.product.create(productsData[i])
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
