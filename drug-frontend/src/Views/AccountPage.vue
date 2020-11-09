<template>
  <div id="account-control">
    <b-tabs
      content-class="mt-5"
      justified
      align="center"
      active-nav-item-class="font-weight-bold text-danger"
    >
      <b-tab title="Inloggen">
        <Login v-on:log-in="Inloggen" v-on:google-login="InloggenMetGoogle" v-on:facebook-login="InloggenMetFacebook"/>
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
import { mapGetters } from "vuex";
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
    InloggenMetGoogle(){
      var provider = new firebase.auth.GoogleAuthProvider();
      
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // eslint-disable-next-line
          var token = result.credential.accessToken;
          // The signed-in user info.
          // eslint-disable-next-line
          var user = result.user;
          // ...
        })
        .catch(function (error) {
          // Handle Errors here.
          // eslint-disable-next-line
          var errorCode = error.code;
          // eslint-disable-next-line
          var errorMessage = error.message;
          // The email of the user's account used.
          // eslint-disable-next-line
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          // eslint-disable-next-line
          var credential = error.credential;
          // ...
        })
    },
    InloggenMetFacebook(){
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  // eslint-disable-next-line
  var token = result.credential.accessToken;
  // The signed-in user info.
  // eslint-disable-next-line
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  // eslint-disable-next-line
  var errorCode = error.code;
  // eslint-disable-next-line
  var errorMessage = error.message;
  // The email of the user's account used.
  // eslint-disable-next-line
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  // eslint-disable-next-line
  var credential = error.credential;
  // ...
});
    }
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
}}
</script>

<style scoped >
</style>


