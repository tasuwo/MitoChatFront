import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    actions: [],
    errors: [],
    isTyping: false
  },
  mutations: {
    startTyping (state) {
      state.isTyping = true
    },
    endTyping (state) {
      state.isTyping = false
    },

    addReactionButton (state, reaction) {
      state.actions.push(reaction)
    },
    resetReactionButtons (state) {
      state.actions = []
    },

    addMessage (state, message) {
      state.messages.push(message)
    },

    addError (state, error) {
      state.errors.push(error)
    }
  }
});
