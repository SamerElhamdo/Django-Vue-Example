<template>
  <div class="posts">
    <NavBar></NavBar>
      <div class="album py-5 bg-light">
          <div class="container">
            <div class="add-post">
              <form v-on:submit.prevent="addPost" class="add-post-form"> 
                <input class="form-control" type="text" v-model="title">
                <br>
                <input class="form-control" type="text" v-model="content">
                <br>
                <el-button @click="addPost" type="primary">اضافة بوست</el-button>
                <br>
                

              </form>
            </div>
            <div class="row">
              <div v-for="posts in APIData" :key="posts.id" class="col-md-4">
                <div class="card mb-4 box-shadow">
                  <img class="card-img-top" src="https://via.placeholder.com/150x100" alt="Card image cap">
                  <div class="card-body">
                      <h4 class=""><a class="text-secondary" href="">{{posts.title}}</a></h4>
                      <p class="card-text">{{posts.content}}</p>
                      <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                      <a href="" class="btn btn-sm btn-outline-primary" role="button" aria-pressed="true">View</a>
                      <button @click="deletePost(posts.id)" class="btn btn-sm btn-outline-secondary" role="button" aria-pressed="true">delete</button>
                      </div>
                      <small class="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
  import NavBar from '../components/Navbar'
  import { getAPI } from '../axios-api'
  import { mapState } from 'vuex'
  export default {
    name: 'Posts',
    data: function() {
      return {

        title: '',
        content: ''
      }

    },

    components: {
      NavBar
    },
    computed: mapState(['APIData']),
    created () {
        getAPI.get('/api-posts/', { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } })
          .then(response => {
            this.$store.state.APIData = response.data
          })
          .catch(err => {
            console.log(err)
            
          })
    },
    methods: {
      addPost() {
        const payload = {
          title: this.title,
          content: this.content

        }
        getAPI.post('/api-posts/', payload, { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } })
          .then(response => {
              
              if (response.status == 201) {
                this.$message({
                  message: 'تم  اضافة بوست  بنجاح',
                  type: 'success'
                });
              }
              this.fetchPost()
            })
            .catch(err => {
              console.log(err)
            
            })
      },
      fetchPost() {
        getAPI.get('/api-posts/', { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } })
          .then(response => {
            this.$store.state.APIData = response.data
          })
          .catch(err => {
            console.log(err)
            
          })
      },
      deletePost(id) {
        getAPI.delete('/api-posts/'+id, { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } })
          .then(response => {    
            console.log(response)
            if (response.status == 204) {
              this.$message({
                message: 'تم   الحذف  بنجاح',
                type: 'success'
              });
            }
            this.fetchPost()
          })
          .catch(err => {
          console.log(err)

          })

      }
      
    }
  }
  
</script>

<style>
.posts {
  direction: rtl;
}
.add-post {
  direction: rtl;
}

</style>
