<template>
  <div>
    <b-form
      @submit="Inloggen"
      @reset="Reset"
      v-if="show"
      :class="[`${windowWidth2 > 800 ? 'special__class2' : 'normal__class2'}`]"
    >
      <b-form-group
        id="input-group-1"
        label="email:"
        label-for="input-log-email"
        description="Voer hier uw email in"
      >
        <b-form-input
          id="input-log-email"
          v-model="email"
          type="email"
          required
          placeholder="MoederNatuur123"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="Wachtwoord:"
        label-for="input-log-wachtwoord"
        description="Voer hier uw wachtwoord in"
      >
        <b-form-input
          id="input-log-wachtwoord"
          v-model="wachtwoord"
          type="password"
          required
          placeholder="***********"
        >
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" class="mr-2">Login</b-button>
      <b-button type="reset" variant="danger" class="ml-2">Reset</b-button>
      
      
      <b-list-group class="mt-5">
        <b-list-group-item variant="danger" v-if="!$v.email.required">
          Gebruikersnaam is verplicht!
        </b-list-group-item>
        <b-list-group-item variant="danger" v-if="!$v.email.minLength"
          >Gebruikersnaam moet minimaal
          {{ $v.gebruikersnaam.$params.minLength.min }} karakters
          zijn!</b-list-group-item
        >
        <b-list-group-item variant="danger" v-if="!$v.email.maxLength"
          >Gebruikersnaam mag maximaal
          {{ $v.gebruikersnaam.$params.maxLength.max }} karakters
          zijn!</b-list-group-item
        >
        <b-list-group-item variant="danger" v-if="!$v.wachtwoord.required"
          >Wachtwoord is verplicht!</b-list-group-item
        >
        <b-list-group-item variant="danger" v-if="!$v.wachtwoord.minLength"
          >Wachtwoord moet minimaal
          {{ $v.wachtwoord.$params.minLength.min }} karakters
          zijn!</b-list-group-item
        >
        <b-list-group-item variant="danger" v-if="!$v.wachtwoord.maxLength"
          >Wachtwoord mag maximaal
          {{ $v.wachtwoord.$params.maxLength.max }} karakters
          zijn!</b-list-group-item
        >
        <b-list-group-item variant="info" v-if="$v.$invalid">
          <kbd>Ongeldige invoer</kbd></b-list-group-item
        >
        <b-list-group-item variant="success" v-if="!$v.$invalid">
          <kbd>Geldige invoer</kbd></b-list-group-item
        >
      </b-list-group>
    </b-form>
    <b-container>
    <b-row>
      <b-col cols="5"> </b-col>
      
      <b-col cols="1"> 
     <img v-on:click="FacebookLogin" src="../../afbeeldingen/facebook.png" width="50%" title="Login with facebook"/>
  <label> Login met Facebook</label>
      </b-col>
      
      <b-col cols="1">
     <img v-on:click="GoogleLogin" src="../../afbeeldingen/google.png" width="50%" title="Login with google"/>
    <label>Login met Google</label>
      
      </b-col>
      <b-col cols="5"/>


    </b-row>
    </b-container>
    
     
  </div>
</template>

<script>
import Vue from "vue";
import Vuelidate from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";
Vue.use(Vuelidate);
export default {
  data() {
    return {
      email: "",
      wachtwoord: "",
      show: true,
      windowWidth2: window.innerWidth,
    };
  },
  methods: {
    Inloggen(e) {
      const Acc = {
        email: this.email,
        wachtwoord: this.wachtwoord,
      };
      this.$v.$touch();
      if (this.$v.$invalid) {
        e.preventDefault();
        alert("Controleer uw gegevens, iets klopt niet");
      } else {
        this.$emit("log-in", Acc);
      }
    },
    Reset(e) {
      e.preventDefault();
      this.account.email = "";
      this.account.wachtwoord = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    GoogleLogin() {
      this.$emit("google-login");
    },
    FacebookLogin(){
      this.$emit("facebook-login");
    }
  },
  validations: {
    email: {
      required,
      email,
      minLength: minLength(4),
      maxLength: maxLength(24),
    },
    wachtwoord: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(24),
    },
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth2 = window.innerWidth;
    };
  },
  updated() {
    window.onresize = () => {
      this.windowWidth2 = window.innerWidth;
    };
  },
};
</script>

<style >
.special__class2 {
  margin-left: 25%;
  margin-right: 25%;
}
.normal__class2 {
  margin-left: 5%;
  margin-right: 5%;
}
</style>