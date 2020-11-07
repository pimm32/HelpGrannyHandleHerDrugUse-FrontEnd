<template>
  <div id="account-control">
    <b-tabs
      content-class="mt-5"
      justified
      align="center"
      active-nav-item-class="font-weight-bold text-danger"
    >
      <b-tab title="Inloggen">
        <Login v-on:log-in="Inloggen" />
      </b-tab>
      <b-tab title="Registeren">
        <Register v-on:reg-acc="CreateAccount" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import Login from "../components/Login";
import Register from "../components/Register";
import firebase from "firebase";
//import axios from "axios";
import Vue from "vue";
import VueResizeText from "vue-resize-text";
Vue.use(VueResizeText);

export default {
  name: "AccountPage",
  data() {
    return {
      
    };
  },
  components: {
    Login,
    Register,
  },
  methods: {
    CreateAccount(obj) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(obj.email, obj.wachtwoord)
        .then(data => {
          data.user
            .updateProfile({
              displayName: obj.gebruikersnaam
            })
            .then(() => {});
        })
        .catch(err => {
          this.error = err.message;
        });/*
      axios({
        method: "post",
        url: "https://i338995core.venus.fhict.nl/account/",
        data: {
          name: obj.gebruikersnaam,
          password: obj.wachtwoord,
          email: obj.email,
        },
      });*/
    },
    Inloggen(obj) {
      firebase
        .auth()
        .signInWithEmailAndPassword(obj.email, obj.wachtwoord)
        
        .then(data => {
          this.$router.replace({ name: "dashboard" });
          console.log(data);
        })
        .catch(err => {
          this.error = err.message;
        });
    },
  },
};
</script>

<style scoped >
</style>


