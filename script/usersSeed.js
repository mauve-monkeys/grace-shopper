const {db} = require('./server/db')

const User = require('./server/db/models/user')

const users = [
  {
    username: 'cara.t',
    email: 'cara.t@gmail.com',
    password: 'kitty',
    googleId: '',
    firstName: 'Cara',
    lastName: 'Takemoto',
    billingAddress: '123 terrace st, New York, NY 12345',
    shippingAddress: '123 terrace st, New York, NY 12345',
    phoneNumber: '666'
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
    phoneNumber: '1275983023'
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

// const seed = async () => {
//   try {
//     await db.sync({ force: true });

//     await Promise.all(
//       users.map(user => {
//         return User.create(user);
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
