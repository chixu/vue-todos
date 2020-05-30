import { api } from "../../utils/http";
var Vue = require('vue')
// initial state
const state = {
  logined: false,
  name: ''
}

// getters
const getters = {

}

// actions
const actions = {
  login({ commit }, data) {
    // api('addtodo', data).then(res => console.log(res));
    api("login", data)
      .then(res => {
        // this.login(res);
        console.log('user login', res);
        window.$cookies.set('token', res.token);
        commit('login', res)
      })
      .catch(err => {
        console.warn(err);
      });
  },
  logout({ commit }, data) {
    api("logout", data)
      .then(res => {
        console.log('user logout', data);
        window.$cookies.set('token', "");
        commit('logout')
      });
  },
}

// mutations
const mutations = {
  login: (state, user) => {
    state.logined = true;
    state.name = user.name;
  },
  logout: (state) => {
    state.logined = false;
    state.name = "";
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}