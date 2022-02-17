const Axios = require('axios');
// import Axios from 'axios'
var axios = Axios.create({ withCredentials: true });
const STORAGE_KEY = 'userDB';

export const userService = {
  login,
  logout,
  getLoggedinUser,
  signup,
  addToCart,
};

function _getUrl(id = '') {
  const BASE_URL =
    process.env.NODE_ENV !== 'development'
      ? '/api/auth'
      : '//localhost:3030/api/auth';
  return `${BASE_URL}/${id}`;
}
function _getUserUrl(id = '') {
  const BASE_URL =
    process.env.NODE_ENV !== 'development'
      ? '/api/user'
      : '//localhost:3030/api/user';
  return `${BASE_URL}/${id}`;
}

window.userService = userService;

async function getLoggedinUser() {
  const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  return user;
}

async function login(user) {
  // TODO: use axios
  try {
    sessionStorage.setItem('userDB', JSON.stringify(user));
    const loggedInUser = await axios.post(_getUrl('login'), user);
    return loggedInUser.data;
  } catch (err) {
    console.log(err);
  }
}

async function logout() {
  try {
    // sessionStorage.removeItem('userDB', JSON.stringify(loggedInUser.data))
    return await axios.post(_getUrl('logout'));
  } catch (err) {
    console.log(err);
  }
}

async function addToCart(toy, user) {
  try {
    const order = {
      createdAt: Date.now(),
      toy,
    };
    const price = +toy.price;
    if (user.balance < price) return alert('You Ran out of money!');
    const balance = user.balance - price;
    user.balance = balance;
    user.orders.push(order);
    // console.log('IM THE USER ', user);
    const updatedUser = await axios.put(_getUserUrl(user._id), { user });
    return updatedUser.data;
  } catch (err) {
    console.log('Couldnt add to cart');
  }
}

async function signup(user) {
  try {
    user.balance = 10000;
    const loggedInUser = await axios.post(_getUrl('signup'), user);
    sessionStorage.setItem('userDB', JSON.stringify(loggedInUser.data));
    return loggedInUser.data;
  } catch (err) {
    console.log('Logged in has failed, try again', err);
  }
}
