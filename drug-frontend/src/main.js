import Vue from 'vue';
import App from './App.vue' ;
import router from './router';
import firebase from "firebase";
import '@firebase/auth';
import store from "./store";
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false

const CONFIGOPSTIONS = {
  apiKey: "AIzaSyA20Zr2RIThieEcDUvMUj0S0JylQD5PCyo",
    authDomain: "helpgrannyhandleherdruguse-f.firebaseapp.com",
    databaseURL: "https://helpgrannyhandleherdruguse-f.firebaseio.com",
    projectId: "helpgrannyhandleherdruguse-f",
    storageBucket: "helpgrannyhandleherdruguse-f.appspot.com",
    messagingSenderId: "689604595630",
    appId: "1:689604595630:web:9a72d3aea2dbc1a618823f",
    measurementId: "G-MGBB7ZSRRN"
}

firebase.initializeApp(CONFIGOPSTIONS);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')