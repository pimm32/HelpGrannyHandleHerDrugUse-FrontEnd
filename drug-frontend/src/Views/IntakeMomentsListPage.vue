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
      <div class="card mt-5">
      <b-label>
        Rood betekend dat u dat medicijn vergeten bent in te nemen! <br/>
        Oranje betekend dat u dat medicijn vandaag in dient te nemen! <br/>
        Blauw betekend dat u dat medicijn in de toekomst pas in dient te nemen!
      </b-label>
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
          method: "delete",
        url: "https://i338995core.venus.fhict.nl/intakemoment/" + obj.id,
        }
      )
      this.Notificatie(
            "Verificatie",
            "Uw inname moment is succesvol geverifieerd",
            "info"
          );
    },
    AddWeeklyIntake(obj){
      var newDate = new Date(obj.startDate);
      newDate.setDate(newDate.getDate() + 7 );
      this.Notificatie(
            "Nieuw inname moment",
            "Een nieuw inname moment is aangemaakt voor: " + obj.medicineName + " op: " + newDate.toString(),
            "success"
          );

      
      axios({
        method: "post",
        url: "https://i338995core.venus.fhict.nl/intakemoment",
        data: {
          medId: obj.medicineId,
          id: obj.id,
          frequency: obj.frequency,
          dosage: obj.dosage,
          startDate: (newDate.getFullYear() + "-" + (newDate.getMonth()+1) + "-" +newDate.getDate()),
          time: (newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds()),
          days: obj.days,
        },
      })
    },
    Notificatie(_title, _text, _type) {
      this.$notify({
        group: "foo",
        title: _title,
        text: _text,
        duration: 10000,
        type: _type
        
      });
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
