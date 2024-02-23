import { categoryProducts } from '../static/js/categoryProducts.js';
import { error } from '../static/js/error.js';
import { home } from '../static/js/home.js';
import { login } from '../static/js/login.js';
import { orderCompleted } from '../static/js/orderCompleted.js';
import { signup } from '../static/js/signup.js';
import CategoryProducts from '../static/pages/CategoryProducts.js';
import Home from '../static/pages/Home.js';
import Login from '../static/pages/Login.js';
import OrderCompleted from '../static/pages/OrderCompleted.js';
import Signup from '../static/pages/Signup.js';

export const routes = [
  { path: '/', view: Home, script: home },
  { path: '/signin', view: Login, script: login },
  { path: '/signup', view: Signup, script: signup },
  {
    path: '/categorys/:categoryProducts',
    view: CategoryProducts,
    script: categoryProducts
  },
  { path: '/orderCompleted', view: OrderCompleted, script: orderCompleted },
  { path: '/error', view: error }
];
