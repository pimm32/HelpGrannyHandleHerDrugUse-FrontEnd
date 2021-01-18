<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Dashboard</div>
          <div class="card-body">
            <div v-if="user" class="alert alert-success" role="alert">U: {{user.data.displayName}}, bent ingelogd!</div>
          </div>
          <b-button @click="gaNaarHome">Home</b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data(){
    return{

    }
  },
      methods:{
        gaNaarHome(){
          this.$router.replace({ name: "intakelist" });
        }
      }
    
  ,
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  }
};
</script>