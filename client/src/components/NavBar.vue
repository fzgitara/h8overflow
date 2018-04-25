<template>
<div>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <a class="navbar-brand" href="#"><img src="../assets/logo.png"> H8 Overflow</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
        </li>
      </ul>
      <button id="nav-button" type="button" class="btn btn-light d-block d-md-none" data-toggle="modal" data-target="#modalAdd" v-if="token">Add Question</button>
      <button id="nav-button" type="button" class="btn btn-light d-block d-md-none" @click="logout" v-if="token">Logout</button>
      <button id="nav-button" type="button" class="btn btn-light d-block d-md-none" data-toggle="modal" data-target="#modalRegister" v-if="!token">Register</button>
      <button id="nav-button" type="button" class="btn btn-light d-block d-md-none" data-toggle="modal" data-target="#modalLogin" v-if="!token">Login</button>
    </div>
      <button id="nav-button" type="button" class="btn btn-light d-none d-md-block" data-toggle="modal" data-target="#modalAdd" v-if="token">Add Question</button>
      <button id="nav-button" type="button" class="btn btn-light d-none d-md-block" @click="logout" v-if="token">Logout</button>
      <button id="nav-button" type="button" class="btn btn-light d-none d-md-block" data-toggle="modal" data-target="#modalRegister" v-if="!token">Register</button>
      <button id="nav-button" type="button" class="btn btn-light d-none d-md-block" data-toggle="modal" data-target="#modalLogin" v-if="!token">Login</button>
  </nav>
  <!-- MODAL LOGIN-->
  <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="modalLogin" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Login</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" v-model="password" placeholder="Password">
              </div>
            </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" style="color: white !important; border-color: gray !important;">Close</button>
          <button type="button" class="btn btn-ligth" @click="login">Login</button>
        </div>
      </div>
    </div>
  </div>
  <!-- MODAL REGISTER-->
  <div class="modal fade" id="modalRegister" tabindex="-1" role="dialog" aria-labelledby="modalRegister" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Register</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputName1">Name</label>
                <input type="text" class="form-control" v-model="name" placeholder="Enter name">
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" v-model="password" placeholder="Password">
              </div>
            </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" style="color: white !important; border-color: gray !important;">Close</button>
          <button type="button" class="btn btn-ligth" @click="register">Register</button>
        </div>
      </div>
    </div>
  </div>
  <!-- MODAL ADD -->
  <div class="modal fade" id="modalAdd" tabindex="-1" role="dialog" aria-labelledby="modalAdd" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Question</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" v-model="title" placeholder="Title">
              </div>
              <div class="form-group">
                <label>Content</label>
                <textarea rows="5" class="form-control" v-model="text" placeholder="Content"></textarea>
              </div>
            </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-ligth" @click="create">Submit</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      token: localStorage.getItem('token'),
      title: '',
      text: ''
    }
  },
  methods: {
    register () {
      let payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', payload)
    },
    login () {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
    },
    logout () {
      this.$store.dispatch('logout')
    },
    create () {
      axios.post('http://localhost:3000/questions', {
        title: this.title,
        text: this.text
      }, {
        headers: {token: localStorage.getItem('token')}
      }).then(response => {
        swal(
          'Success!',
          'New question submitted',
          'success'
        ).then(() => location.reload())
      })
    }
  }
}
</script>

<style scoped>
img{
  height: 28px;
}
</style>
