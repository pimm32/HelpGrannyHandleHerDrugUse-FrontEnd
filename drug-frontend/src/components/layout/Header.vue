<template>
  <header class="header">
    <h1>Maak je niet drug</h1>
    <div id="nav">
      <b-navbar toggleable="lg" type="dark" variant="secondary">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/" v-resize-text>Home</b-nav-item>
            <b-nav-item to="/medicinelist" v-resize-text>
              Medicine List</b-nav-item
            >
            <b-nav-item to="/#" v-if="user.loggedIn" v-resize-text>
              My Account</b-nav-item
            >
            <b-nav-item v-if="user.loggedIn"
              ><a @click.prevent="signOut"> Log Out</a></b-nav-item
            >
            <b-nav-item to="/account" v-if="!user.loggedIn" v-resize-text>
              Login/Register</b-nav-item
            >
            <div v-if="user.loggedIn">{{user.data.displayName}}</div>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script>
import Vue from "vue";
import VueResizeText from "vue-resize-text";
import { mapGetters } from "vuex";
import firebase from "firebase";
Vue.use(VueResizeText);
export default {
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "home",
          });
        });
    },
  },
};
</script>

<style scoped>
.header {
  background: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
}
.header a {
  color: #fff;
  padding-right: 5px;
  text-decoration: none;
}
</style>