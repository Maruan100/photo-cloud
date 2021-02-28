import { Auth } from "aws-amplify";
import router from '../../router/index';

export const state = {
  user: null,
  showSignUp: false,
};

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_ACTION(state, value) {
    state.showSignUp = value;
  },
};

export const actions = {
  async logout({ commit }) {
    commit("SET_USER", null);
    localStorage.removeItem('authData')
    router.push('/');
    return await Auth.signOut();
  },
  async login({ commit }, { username, password }) {
    try {
      await Auth.signIn({
        username,
        password,
      });
      const userInfo = await Auth.currentUserInfo();
      const parsed = JSON.stringify(userInfo);
      localStorage.setItem('authData', parsed);
      commit("SET_USER", userInfo);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async confirmSingUp({}, { username, code }) {
    try {
      await Auth.confirmSignUp(username, code);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async singUp({}, { username, email, password }) {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async authAction({ commit }) {
    const userInfo = await Auth.currentUserInfo();
    commit("SET_USER", userInfo);
  },
  changeAction({ commit }, value) {
    commit("SET_ACTION", value);
  },
};
