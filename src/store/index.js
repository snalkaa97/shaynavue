import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";
window.session_key = "aloalka";
const vuexLocal = new VuexPersistence({
	key: window.session_key,
	storage: window.sessionStorage,
});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carts:[]
  },
  mutations: {
    addCart(state,payload){
      state.carts.push(payload)
    },
    //delete cart
    deleteCart(state,payload){
      let index = state.carts.indexOf(payload)
      state.carts.splice(index,1)
    },
    clearCarts(state){
      state.carts = []
    }
  },
  getters: {

  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin],

})
