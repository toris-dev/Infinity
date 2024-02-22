import Error from '../static/pages/Error.js';
import Home from '../static/pages/Home.js';
import Login from '../static/pages/Login.js';
import Signup from '../static/pages/Signup.js';
import Product from '../static/pages/Product.js';

export const routes = [
  { path: '/', view: Home },
  { path: '/login', view: Login },
  { path: '/signup', view: Signup },
  { path: '/error', view: Error }
];
