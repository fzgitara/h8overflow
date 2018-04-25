import Vue from 'vue'
import Vuex from 'vuex'
import swal from 'sweetalert2'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listQuestions: [],
    listAnswers: []
  },
  mutations: {
    getAllQuestions (state, payload) {
      state.listQuestions = payload
    },
    getAllAnswers (state, payload) {
      state.listAnswers = payload
    }
  },
  actions: {
    getAllQuestions (context, payload) {
      axios.get('http://localhost:3000/questions').then(response => {
        context.commit('getAllQuestions', response.data.data)
      })
    },
    getAllAnswers (context, payload) {
      axios.get('http://localhost:3000/answers').then(response => {
        context.commit('getAllAnswers', response.data.data)
      })
    },
    register (context, payload) {
      axios.post('http://localhost:3000/users/register', payload).then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('id', response.data.user._id)
        swal(
          'Register Success!',
          'You are now logged in',
          'success'
        ).then(() => location.reload())
      })
    },
    login (context, payload) {
      axios.post('http://localhost:3000/users/login', payload).then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('id', response.data.user._id)
        swal(
          'Login Success!',
          '',
          'success'
        ).then(() => location.reload())
      })
    },
    logout (context) {
      swal({
        title: 'Are you sure?',
        text: 'You will logout from this site',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
      }).then((result) => {
        if (result.value) {
          swal(
            'Logout!',
            'You are logged out',
            'success'
          ).then(() => {
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            location.reload()
          })
        }
      })
    }
  }
})
