import { categoryProducts } from '../static/js/categoryProducts.js';
import { error } from '../static/js/error.js';
import { home } from '../static/js/home.js';
import { login } from '../static/js/login.js';
import { orderCompleted } from '../static/js/orderCompleted.js';
import { product } from '../static/js/product.js';
import { signup } from '../static/js/signup.js';
import CategoryProducts from '../static/pages/CategoryProducts.js';
import Home from '../static/pages/Home.js';
import Login from '../static/pages/Login.js';
import Order from '../static/pages/Order.js';
import OrderCompleted from '../static/pages/OrderCompleted.js';
import Product from '../static/pages/Product.js';
import Signup from '../static/pages/Signup.js';

export const routes = [
  { Path: '/', View: Home, Script: home },
  { Path: '/signin', View: Login, Script: login },
  { Path: '/signup', View: Signup, Script: signup },
  { Path: '/product', View: Product, Script: product },
  { Path: '/order', View: Order },
  {
    Path: '/categorys/:categoryProducts',
    View: CategoryProducts,
    Script: categoryProducts
  },
  { Path: '/orderCompleted', View: OrderCompleted, Script: orderCompleted },
  { Path: '/error', View: error, Script: error }
];
