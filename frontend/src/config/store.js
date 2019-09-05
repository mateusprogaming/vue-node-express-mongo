import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
// aqui estamos dizendo para ele usar o vuex
Vue.use(Vuex)

export default new Vuex.Store({
    //dados e funcoes
    state: {
        //atributos
        isMenuVisible: false,
        user: null
    }, 
    mutations: {
        //alternando o menu
        toggleMenu(state, isVisible) {
            if(!state.user) {
                state.isMenuVisible = false
                return
            }

            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user) {
            state.user = user
            if(user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isMenuVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    }
})