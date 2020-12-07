<template>
  <div id="app">
    <div class="container mt-5">
      <div class="card mt-5">
        <IntakeMomentListForUser
          v-bind:intakeList="intakeMoments"
          v-on:verify-intake="VerifyIntake"
          v-on:weekly-intake="AddWeeklyIntake"
        />
      </div>
    </div>
  </div>
</template>

<script>
import IntakeMomentListForUser from "../components/IntakeMomentListForUser";
import axios from "axios";
import { mapGetters } from "vuex";
import Vue from "vue";
import VueResizeText from "vue-resize-text";
Vue.use(VueResizeText);

export default {
  name: "IntakeMomentsListPage",
  components: {
    IntakeMomentListForUser
  },
  data() {
    return {
      intakeMoments: [],
    };
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  methods: {
    VerifyIntake(obj){
      axios(
        {
          method:"put",
          url: "",
          data: {
            intakeId: obj.id,
            verified: true,
          }
        }
      )
    },
    AddWeeklyIntake(obj){
      console.log(obj)
    },
  },
  // THIS CODE RUNS WHEN A NEW VUE INSTANCE IS CREATED (AKA WHEN THE TABLE IS CALLED FIRST)
  mounted() {
    axios
      .get("https://i338995core.venus.fhict.nl/IntakeMoment/GetAllByAccountId/" + this.user.data.uid)
      .then((res) => ((res.data).forEach(element => {
        axios.get("https://i338995core.venus.fhict.nl/Medicine/" + element.medicineId).then((res) => this.$set(element, "medicineName" , res.data.name)).catch((err) => console.log(err));
      this.intakeMoments = res.data
      }) ))
    
  },
 
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
