import Vue from 'vue'
import Vuex from 'vuex'
import Storage from 'compatible-storage'
import key from './key'
import StorageKey from '../assets/js/storage-key'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    windowSize: {},
    sign: {
      in: {
        show: false,
        info: null
      },
      up: {
        show: false
      }
    }
  },
  mutations: {
    [key.SET_WINDOW_SIZE] (state, windowSize) {
      state.windowSize = windowSize
    },
    [key.SHOW_SIGN_IN] (state) {
      state.sign.in.show = true
    },
    [key.HIDE_SIGN_IN] (state) {
      state.sign.in.show = false
    },
    [key.SHOW_SIGN_UP] (state) {
      state.sign.up.show = true
    },
    [key.HIDE_SIGN_UP] (state) {
      state.sign.up.show = false
    },
    [key.SET_SIGN_IN_INFO] (state, signInfo) {
      Storage.set(StorageKey.USER_SIGN_IN_INFO, signInfo)
      state.sign.in.info = signInfo
      window.globalApp.signInInfo = signInfo
    }
  },
  actions: {
    setWindowSize ({ commit }, windowSize) {
      commit(key.SET_WINDOW_SIZE, windowSize)
    },
    showSignIn ({ commit }) {
      commit(key.SHOW_SIGN_IN)
    },
    hideSignIn ({ commit }) {
      commit(key.HIDE_SIGN_IN)
    },
    showSignUp ({ commit }) {
      commit(key.SHOW_SIGN_UP)
    },
    hideSignUp ({ commit }) {
      commit(key.HIDE_SIGN_UP)
    },
    setSignInInfo ({ commit }, signInInfo) {
      commit(key.SET_SIGN_IN_INFO, signInInfo)
    }
  },
  getters: {
    windowWidth: state => state.windowSize.width,
    windowHeight: state => state.windowSize.height,
    isShowSignIn: state => state.sign.in.show,
    isShowSignUp: state => state.sign.up.show,
    signInInfo: state => state.sign.in.info
  }
})
