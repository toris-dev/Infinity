import Home from '../static/pages/Home.js';
import Login from '../static/pages/Login.js';
import Signup from '../static/pages/Signup.js';

export const routes = [
  { path: '/', view: Home },
  { path: '/login', view: Login },
  { path: '/signup', view: Signup }
];
