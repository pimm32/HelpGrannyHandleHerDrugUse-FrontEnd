<template>
  <div id="medicine-detail" align="center">
    <div v-if="this.medicine!=null && this.user.loggedIn">
    <h1>{{ medicine.name }}</h1>
    <b-card no-body style="max-width: 75%;">
      <b-tabs pills card vertical class="text-left">
        <b-tab title="Waarvoor"
          ><b-card-text>{{ medicine.description }}</b-card-text></b-tab
        >
       
        <b-tab title="Inname momenten"
          ><b-card-text> </b-card-text>
          <NewMedicineIntake v-on:add-intakemoment="addIntakemoment" />
          <IntakeList
            v-bind:intakeList="intakeMoments"
            v-on:delete-intakemoment="DeleteIntakemoment"
          />
        </b-tab>
        <b-tab title="Mogelijke Bijwerkingen"
          ><Sideeffects  v-bind:medicine="this.medicine" />
          </b-tab
        >
        
        <!--  <b-tab title="Notities"><b-card-text>Tab contents 3</b-card-text></b-tab> -->
      </b-tabs>
    </b-card>
    </div>
    <div v-else-if="!this.user.loggedIn" class="mt-5">
      Het ziet er naar uit dat u bent uitgelogd
      <br/>
      Klik hier om opnieuw in te loggen!
      <br/>
      <b-button @click="$router.replace({ name: 'Home' })">Log in</b-button>
    </div>
    <div v-else >
      <div class="card mt-5">
        Oops er gaat iets fout
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NewMedicineIntake from "../components/NewMedicineIntake";
import IntakeList from "../components/MedicineIntakesList";
import { mapGetters } from "vuex";
import Sideeffects from '../components/Sideeffects.vue';
export default {
  name: "MedicinePage",
  components: {
    NewMedicineIntake,
    IntakeList,
    Sideeffects,
  },
   computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  data() {
    return {
      medicine:this.$route.params.medicine,
      intakeMoments: [],
    };
  },
  created() {
    axios
      .get("https://i338995core.venus.fhict.nl/Medicine/" + this.medicine.id)
      .then((res) => (this.medicine = res.data))
      .catch((err) => console.log(err));

    axios
      .get("https://i338995core.venus.fhict.nl/IntakeMoment/GetAllByMedicineId/" + this.medicine.id)
      .then((res) => (this.intakeMoments = res.data))
      .catch((err) => (console.log(err)));
  },
  methods: {
    addIntakemoment(obj) {
      this.intakeMoments = [...this.intakeMoments, {medId: this.medicine.id,
          frequency: obj.frequency,
          dosage: (obj.dosage + " " + obj.dosageForm),
          startDate: obj.startDate + "T"+ obj.time}];
      axios({
        method: "post",
        url: "https://i338995core.venus.fhict.nl/intakemoment",
        data: {
          medId: this.medicine.id,
          frequency: obj.frequency,
          dosage: (obj.dosage + " " + obj.dosageForm),
          startDate: obj.startDate,
          time: obj.time,
          days: obj.days,
        },
      })
        .then(
          (res) =>
            (this.medicine.intakeMoments = [
              ...this.medicine.intakeMoments,
              res.data,
            ])
        )
        .catch((err) => console.log(err));
        this.Notificatie(
        "Inname moment toegevoegd",
        "Het innamemoment is succesvol toegevoegd voor " + this.medicine.name + " !",
        "success"
      );
    },
    DeleteIntakemoment(obj) {
      this.intakeMoments.splice(this.intakeMoments.indexOf(obj), 1);
      axios({
        method: "delete",
        url: "https://i338995core.venus.fhict.nl/intakemoment/"+ obj.id,
      });
      this.Notificatie(
        "Inname moment verwijderd",
        "Het innamemoment is succesvol verwijderd voor " + this.medicine.name + " !",
        "error"
      );
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
};
</script>
