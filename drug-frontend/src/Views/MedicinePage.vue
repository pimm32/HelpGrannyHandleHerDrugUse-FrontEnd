<template>
  <div id="medicine-detail" align="center">
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
            v-on:edit-intakemoment="UpdateIntakemoment"
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
</template>

<script>
import axios from "axios";
import NewMedicineIntake from "../components/NewMedicineIntake";
import IntakeList from "../components/MedicineIntakesList";
import Sideeffects from '../components/Sideeffects.vue';
export default {
  name: "MedicinePage",
  components: {
    NewMedicineIntake,
    IntakeList,
    Sideeffects,
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
      console.log(obj);
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
    },
    DeleteIntakemoment(obj) {
      axios({
        method: "delete",
        url: "https://i338995core.venus.fhict.nl/intakemoment",
        data: {
          id: obj.id,
        },
      });
    },
    UpdateIntakemoment(obj) {
      axios({
        method: "put",
        url: "https://i338995core.venus.fhict.nl/intakemoment",
        data: {
          medId: this.id,
          id: obj.id,
          frequency: obj.frequency,
          dosage: (obj.dosage + " " + obj.dosageForm),
          startDate: obj.startDate,
          time: obj.time,
          days: obj.days,
        },
      });
    },
  },
};
</script>
