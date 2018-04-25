<template>
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
</template>

<script>
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
    add () {
      this.$store.dispatch('add', {
        title: this.title,
        text: this.text
      })
    }
  }
}
</script>

<style>

</style>
