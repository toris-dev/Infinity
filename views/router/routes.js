import Home from '../static/pages/Home.js';
import Login from '../static/pages/Login.js';
import Signup from '../static/pages/Signup.js';
import Payment from '../static/pages/Payment.js';

export const routes = [
  { path: '/', view: Home },
  { path: '/login', view: Login },
  { path: '/signup', view: Signup },
  { path: '/payment', view: Payment }
];
