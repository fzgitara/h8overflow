<template>
  <div class="home container">
    <div class="card" v-for="(question, i) in questions" :key="i">
      <div class="card-body">
        <div class="row">
          <h4 class="col-9">
            {{question.title}}
          </h4>
          <div class="col-3">
            {{question.votes.length}} <i class="fas fa-thumbs-up"></i>
          </div>
        </div>
        <hr>
        <blockquote class="blockquote mb-0">
          <p>{{question.text}}</p>
          <footer class="blockquote-footer">Question from <cite title="Source Title">{{question.user.name}}</cite></footer>
        </blockquote>
        <button class="btn btn-primary" data-toggle="modal" data-target="#answerModal">Answers</button>
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
                <button type="button" class="btn btn-primary" @click="postAnswer(question._id)">Post</button>
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
            {{answer.votes.length}} <i class="fas fa-thumbs-up"></i>
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
    postAnswer (_id) {
      axios.post(`http://localhost:3000/answers/${_id}`, {text: this.answer}, {
        headers: {token: localStorage.getItem('token')}
      }).then(response => {
        swal(
          'Success!',
          'Your answer has submitted',
          'success'
        ).then(() => location.reload())
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
