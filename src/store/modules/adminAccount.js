// import PouchDB from 'pouchdb'
// var db = new PouchDB('admindb')

export default {
  namespaced: true,
  state: {
    token: "",
    user: {},
    SDKAppID: null, //im SDKAppID
    tim: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setSDKAppID(state, SDKAppID) {
      state.SDKAppID = SDKAppID;
    },
    setTim(state, tim) {
      state.tim = tim;
    }
  }
};
