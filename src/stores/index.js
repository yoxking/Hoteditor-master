import Vue from 'vue'
import Vuex from 'vuex'
import undoRedoPlugin from './plugins/undo-redo/index'
import editor from './modules/editor'
import loading from './modules/loading'
import i18n from './modules/i18n'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    editor,
    loading,
    i18n
  },
  plugins: [undoRedoPlugin]
})
