import Vue from 'vue';
import Vuex from 'vuex';
import { toyService } from '@/services/toy-service.js';
import { userService } from '@/services/user-service.js';
import reviewStore from './review.store.js';
import { reviewService } from '../services/review.service.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    reviewStore,
  },
  state: {
    toys: [],
    filterBy: '',
    loggedInUser: null,
  },
  getters: {
    getLoggedinUser(state) {
      return state.loggedInUser;
    },
    getToys(state) {
      return state.toys;
    },
    loggedInUser(state) {
      return state.loggedInUser;
    },
    toysForDisplay(state) {
      // let toysToShow = JSON.parse(JSON.stringify(state.toys))
      // return toysToShow
      return state.toys;
    },
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys;
    },
    remove(state, { toyId }) {
      const idx = state.toys.findIndex((toy) => toy._id === toyId);
      state.toys.splice(idx, 1);
    },
    update(state, { savedToy }) {
      const idx = state.toys.findIndex((toy) => savedToy._id === toy._id);
      state.toys.splice(idx, 1, savedToy);
    },
    filter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    signUp(state, { loggedInUser }) {
      state.loggedInUser = loggedInUser;
    },
    login(state, { loggedInUser }) {
      state.loggedInUser = loggedInUser;
    },

    logout(state) {
      state.loggedInUser = null;
    },
  },
  actions: {
    async logout({ commit }, { loggedOutUser }) {
      const loggedOut = await userService.logout();
      if (loggedOut) {
        console.log('Logged Out Succesfully');
        commit({ type: 'logout' });
        return true;
      }
    },
    async signUp({ commit }, { user }) {
      try {
        const loggedInUser = await userService.signup(user);

        commit({ type: 'signUp', loggedInUser });
        return loggedInUser;
      } catch (err) {
        console.log(err);
      }
    },
    async addToCart({ commit }, { toy, user }) {
      try {
        const updatedUser = await userService.addToCart(toy, user);
        // console.log('loggedInUser : ', updatedUser);
        commit({ type: 'login', loggedInUser: updatedUser });
      } catch (err) {
        console.log(err);
      }
    },

    async login({ commit }, { user }) {
      try {
        const loggedInUser = await userService.login(user);
        commit({ type: 'login', loggedInUser });
        return loggedInUser;
      } catch (err) {
        console.log(err);
      }
    },
    async loadToys({ commit, state }) {
      try {
        var filterBy = state.filterBy ? state.filterBy : '';
        const toys = await toyService.query(filterBy);
        commit({ type: 'setToys', toys });
      } catch (err) {
        console.log(err);
      }
    },
    filter({ commit, dispatch }, { filterBy }) {
      commit({ type: 'filter', filterBy });
      dispatch({ type: 'loadToys' });
    },
    async updateToy({ commit }, { toy }) {
      try {
        const savedToy = await toyService.save(toy);
        commit({ type: 'update', savedToy });
        return savedToy;
      } catch (err) {
        console.log(err);
      }
    },

    async remove({ commit }, { toyId }) {
      try {
        const res = await toyService.deleteToy(toyId);
        commit({ type: 'remove', toyId });
      } catch (err) {
        console.log(err);
      }
    },
  },
});
