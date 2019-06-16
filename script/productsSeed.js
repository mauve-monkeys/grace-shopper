const {db} = require('./server/db')

const Product = require('./server/db/models/product')

// here's some sample candies to get you started
// feel free to edit these or add your own!
const products = [
  {
    name: 'Sparkling Wishbone Ring',
    description:
      'Make all your wishes come true with this delicate Pandora ring, crafted from sterling silver and lined with sparkling cubic zirconia stones. Simple yet elegant, this wishbone-shaped ring can be worn on its own as a shimmering statement, or paired with other Pandora stackable rings to create a unique, highly individual look.',
    imageUrl:
      'https://www.becharming.com/media/catalog/product/cache/1/image/750x750/9df78eab33525d08d6e5fb8d27136e95/b/e/beaded_wish_ring-196315.jpg',
    price: 69.99,
    SKU: 1,
    stone: 'diamond',
    band: 'sliver',
    size: ''
  },
  {
    name: 'Flower Crown Ring',
    description:
      'Decorate fingers with this dazzling ring in Pandora Rose. Shaped as a flower garland, the blush-pink design sparkles with clear stones. Stack with similar designs or wear solo as a subtle statement.',
    imageUrl:
      'https://i.etsystatic.com/10202543/r/il/460163/1565583145/il_fullxfull.1565583145_5yie.jpg',
    price: 39.99,
    SKU: 2,
    stone: 'ruby',
    band: 'gold',
    size: ''
  },
  {
    name: 'Princess Tiara Ring',
    description:
      'Fit for a modern fairy tale, this PANDORA Shine™ ring in 18K gold-plated sterling silver boasts a tiara with a heart and a brilliant cubic zirconia stone. It will make you feel like a princess every day.',
    imageUrl:
      'https://d1tvmw30728evr.cloudfront.net/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/b/k/bk909036.jpg',
    price: 79.99,
    SKU: 3,
    stone: 'diamond',
    band: 'sliver',
    size: ''
  },
  {
    name: 'Heart of Winter Ring,',
    description:
      'Declare your love for the winter season with this chic sterling silver statement ring. Its embellished heart design is abstract and delicate at the same time, thanks to its shimmering cubic zirconia ice ruby motif.',
    imageUrl: 'https://i.ebayimg.com/images/g/Tr4AAOSwMqBaXUZE/s-l300.jpg',
    price: 49.99,
    SKU: 4,
    stone: 'diamond',
    band: 'sliver',
    size: ''
  },
  {
    name: 'Simple Band Ring',
    description:
      'Add a subtle touch of sparkle to every outfit with this Pandora eternity ring, crafted in polished Pandora Rose™ – a 14k rose gold-plated unique metal blend. Simple yet stylish, this classic style is embellished with shimmering cubic zirconia stones. Elegant on its own, it looks exceptional when stacked with other Pandora rings in contrasting metal tones.',
    imageUrl:
      'https://i03.hsncdn.com/is/image/HomeShoppingNetwork/prodfull/24ctw-white-diamond-14k-rose-gold-eternity-band-ring-d-00010101000000~8727726w.jpg',
    price: 89.99,
    SKU: 5,
    stone: 'diamond',
    band: 'gold',
    size: ''
  },
  {
    name: 'Regal Beauty Ring',
    description:
      'Perfect for stacking, the royal-inspired pattern on this PANDORA Rose™ ring is unique and sophisticated. It turns a classic band into an eye-catching essential.',
    imageUrl:
      'https://soldes2016.club/wp-content/uploads/2018/11/jamie-joseph-rings-picture-of-full-of-regal-beauty-this-jamie-joseph-ring-is-fit-for-a-queen-the-of-jamie-joseph-rings-1.jpg',
    price: 99.99,
    SKU: 6,
    stone: 'ruby',
    band: 'rose',
    size: ''
  },
  {
    name: 'Radiant Teardrop Ring',
    description:
      'This ultra-glamorous statement ring in PANDORA Rose™ will cast glorious light on your fingers, courtesy of its beautiful teardrop-shaped cubic zirconia stone.',
    imageUrl:
      'https://www.reeds.com/pub/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/p/a/pandora_rose_radiant_teardrop_ring_clear_cubic_zirconia-1-186251cz-t1559105710.jpg',
    price: 99.99,
    SKU: 7,
    stone: 'diamond',
    band: 'gold',
    size: ''
  },
  {
    name: 'Dazzling Droplet Ring',
    description:
      'Nothing less than absolutely dazzling, this sterling silver ring features pavé-set stones on a central dome. Reflecting the beautiful light effect of a water droplet, this striking ring looks best when stacked with the other rings in the Droplets series.',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/5123oDEdRcL._UL1000_.jpg',
    price: 89.99,
    SKU: 8,
    stone: 'diamond',
    band: 'sliver',
    size: ''
  },
  {
    name: ' Sparkling Red Heart Ring',
    description:
      "Set your heart on fire with this sparkling Pandora heart ring. Crafted in sterling silver, this stunning solitaire ring features a heart-shaped cubic zirconia stone in ruby red, flanked by two shimmering stones. A beautiful gift for Valentine's Day, birthdays, and anniversaries, it is the perfect expression of love. Let it shine solo or stack it with other Pandora rings.",
    imageUrl:
      'https://img.shopstyle-cdn.com/pim/b0/e3/b0e3825ec859df87ffed7a5b367f6e47_xlarge.jpg',
    price: 59.99,
    SKU: 9,
    stone: 'ruby',
    band: 'sliver',
    size: ''
  },
  {
    name: 'Sparkling Elegance Ring',
    description:
      'A trio of striking stones decorates this elegant ring in Pandora Rose. The blush-pink design has a vintage feel, and is perfect for wear alone or in ring stacks.',
    imageUrl:
      'https://www.becharming.com/media/catalog/product/cache/1/image/750x750/9df78eab33525d08d6e5fb8d27136e95/r/a/radiant_elegance_ring_rose-180986cz.jpg',
    price: 69.99,
    SKU: 10,
    stone: 'diamond',
    band: 'gold',
    size: ''
  },
  {
    name: 'Hearts of Pandora Ring',
    description:
      'Show that your love is forever with this classic Pandora Shine eternity ring in 18K gold-plated sterling silver. Its golden color, cut-out hearts and clear cubic zirconia stones make it a fabulous stacking ring.',
    imageUrl: 'https://www.denmarkstyle.net/images/enlarged/180963CZ.jpg',
    price: 59.99,
    SKU: 11,
    stone: 'diamond',
    band: 'gold',
    size: ''
  },
  {
    name: 'Twist Of Fate Stackable Ring',
    description:
      'Two rows of clear sparkling cubic zirconias entwine in this sterling silver ring, representing how your lives are connected. Beautiful alone and also stacked with your favorite PANDORA rings.',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61hWKbujoJL._UY395_.jpg',
    price: 69.99,
    SKU: 12,
    stone: 'diamond',
    band: 'sliver',
    size: ''
  }
]

// const seed = async () => {
//   try {
//     await db.sync({ force: true });

//     await Promise.all(
//       products.map(product => {
//         return Product.create(product);
//       })
//     );

//     console.log(green("Seeding success!"));
//     db.close();
//   } catch (err) {
//     console.error(red("Oh noes! Something went wrong!"));
//     console.error(err);
//     db.close();
//   }
// };
