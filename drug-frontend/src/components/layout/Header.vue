<template>
  <header class="header">
    <h1>Maak je niet drug</h1>
    <div id="nav">
      <b-navbar toggleable="lg" type="dark" pills variant="secondary">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item v-if="user.loggedIn" to="/intakelist" v-resize-text
              >Home</b-nav-item
            >
            <b-nav-item v-if="!user.loggedIn" to="/" v-resize-text
              >Home</b-nav-item
            >

            <b-nav-item-dropdown to="/#" v-if="user.loggedIn" v-resize-text>
              <template #button-content> Mijn medicijnen </template>
              <b-dropdown-item to="/medicinelist"
                >Medicijnen lijst</b-dropdown-item
              >
              <b-dropdown-item to="/intakelist"
                >Inname momenten</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown to="/#" v-resize-text>
              <template #button-content>
                <em>Mijn Account</em>
              </template>
              <b-dropdown-item v-if="user.loggedIn"
                ><a @click.prevent="signOut"> Uitloggen</a></b-dropdown-item
              >
              <b-dropdown-item v-else to="/account"
                >Inloggen/Registreren</b-dropdown-item
              >
            </b-nav-item-dropdown>
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
        .then(() => {});
      location.reload();
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