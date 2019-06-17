/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as SingleProduct} from './singleProduct'
export {default as AllProducts} from './allProducts'
export {default as ProductDetails} from './productDetails'
export {default as CartView} from './cartView'
export {default as Orders} from './orderHistory'
export {default as AddCartButton} from './add-cart-button'
export {default as CartNavbar} from './cart-navbar'
export {default as Loading} from './loading'
