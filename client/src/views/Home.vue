<template>
  <div class="home container">
    <div class="card" v-for="(question, i) in questions" :key="i">
      <div class="card-body">
        <div class="row">
          <h4 class="col-9">
            {{question.title}}
          </h4>
          <div class="col-3">
            <button class="btn btn-info" @click="vote(question._id)"><i class="fas fa-thumbs-up"> {{question.votes.length}} </i> </button>
            <!-- <button class="btn-disable" @click="voteQuestion(question._id)"><i class="fas fa-thumbs-up"> {{question.votes.length}} </i> </button> -->
            <button class="btn btn-danger" v-if="idUser == question.user._id" @click="del(question._id)">Delete</button>
          </div>
        </div>
        <hr>
        <blockquote class="blockquote mb-0">
          <p>{{question.text}}</p>
          <footer class="blockquote-footer">Question from <cite title="Source Title">{{question.user.name}}</cite></footer>
        </blockquote>
        <button class="btn btn-primary" data-toggle="modal" data-target="#answerModal" @click="modalAnswer(question._id)">Answers</button>
        <!-- MODAL ANSWER -->
        <div class="modal fade" id="answerModal" tabindex="-1" role="dialog" aria-labelledby="answerModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="answerModalLabel">Your answer</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <textarea class="form-control" cols="30" rows="10" placeholder="answer" v-model="answer"></textarea>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="postAnswer">Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer" v-for="(answer, i) in question.answers" :key="i">
        <div class="row">
          <div class="col-9">
            {{answer.text}}
          </div>
          <div class="col-3">
            <button class="btn btn-success"><i class="fas fa-thumbs-up"> {{answer.votes.length}}</i></button>
            <!-- <button class="btn btn-danger" v-if="idUser == answer.user" @click="delAnswer(answer.user)">Delete</button> -->
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
  name: 'home',
  data () {
    return {
      idUser: localStorage.getItem('id'),
      emailUser: '',
      id: '',
      answer: ''
    }
  },
  created () {
    this.$store.dispatch('getAllQuestions')
    this.$store.dispatch('getAllAnswers')
  },
  computed: {
    questions () {
      return this.$store.state.listQuestions
    }
  },
  methods: {
    modalAnswer (_id, email) {
      this.id = _id
      this.emailUser = email
    },
    postAnswer () {
      axios.post(`http://localhost:3000/answers/${this.id}`, {text: this.answer}, {
        headers: {token: localStorage.getItem('token')}
      }).then(response => {
        this.id = ''
        swal(
          'Success!',
          'Your answer has submitted',
          'success'
        ).then(() => location.reload())
      })
    },
    vote (id) {
      console.log('sebelum vote')
      axios.put(`http://localhost:3000/questions/${id}/vote`, {
        headers: {token: localStorage.getItem('token')}
      }).then(response => {
        console.log(response.data)
      })
      console.log('sesudah vote')
    },
    del (id) {
      swal({
        title: 'Are you sure?',
        text: 'You will delete this question',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.value) {
          axios.delete(`http://localhost:3000/answers/${id}`).then(response => {
            swal(
              'Deleted!',
              'Question is deleted',
              'success'
            ).then(() => {
              location.reload()
            })
          })
        }
      })
    },
    delAnswer (id) {
      swal({
        title: 'Are you sure?',
        text: 'You will delete this question',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.value) {
          axios.delete(`http://localhost:3000/questions/${id}`).then(response => {
            swal(
              'Deleted!',
              'Question is deleted',
              'success'
            ).then(() => {
              location.reload()
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.card {
  margin-top: 15px;
}
</style>
