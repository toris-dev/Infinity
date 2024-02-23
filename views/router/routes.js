import { categoryProducts } from '../static/js/categoryProducts.js';
import { error } from '../static/js/error.js';
import { home } from '../static/js/home.js';
import { login } from '../static/js/login.js';
import { signup } from '../static/js/signup.js';
import { product } from '../static/js/product.js';
import CategoryProducts from '../static/pages/CategoryProducts.js';
import Home from '../static/pages/Home.js';
import Login from '../static/pages/Login.js';
import Signup from '../static/pages/Signup.js';
import Product from '../static/pages/Product.js';
import Order from '../static/pages/Order.js';

export const routes = [
  { path: '/', view: Home, script: home },
  { path: '/signin', view: Login, script: login },
  { path: '/signup', view: Signup, script: signup },
  { path: '/product', view: Product, script: product },
  { path: '/order', view: Order },
  {
    path: '/categorys/:categoryProducts',
    view: CategoryProducts,
    script: categoryProducts
  },
  { path: '/error', view: error }
];
