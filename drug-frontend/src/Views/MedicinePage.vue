<template>
  <div id="medicine-detail" align="center">
    <h1>{{ medicine.name }}</h1>
    <b-card no-body style="max-width: 75%;">
      <b-tabs pills card vertical class="text-left">
        <b-tab title="Waarvoor"
          ><b-card-text>{{ medicine.description }}</b-card-text></b-tab
        >
        <b-tab title="Wanneer niet te gebruiken"
          ><b-card-text>Tab contents 2</b-card-text></b-tab
        >
        <b-tab title="Gebruik"
          ><b-card-text> </b-card-text>
          <NewMedicineIntake v-on:add-intakemoment="addIntakemoment" />
          <IntakeList
            v-bind:intakeList="medicine.intakeMoments"
            v-on:edit-intakemoment="UpdateIntakemoment"
            v-on:delete-intakemoment="DeleteIntakemoment"
          />
        </b-tab>
        <b-tab title="Mogelijke Bijwerkingen"
          ><b-card-text>Tab contents 3</b-card-text></b-tab
        >
        <b-tab title="Hoe bewaar ik dit middel"
          ><b-card-text>Tab contents 3</b-card-text></b-tab
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
export default {
  name: "MedicinePage",
  components: {
    NewMedicineIntake,
    IntakeList,
  },
  data() {
    return {
      id: this.$route.params.id,
      medicine: {},
    };
  },
  created() {
    axios
      .get("https://localhost:44394/Medicine/" + this.id)
      .then((res) => (this.medicine = res.data))
      .catch((err) => console.log(err));
  },
  updated() {
    axios({
      method: "get",
      url: "https://localhost:44394/Medicine/",
      data: {
        id: this.id,
      },
    })
      .then((res) => (this.medicine = res.data))
      .catch((err) => console.log(err));
  },
  methods: {
    addIntakemoment(obj) {
      console.log(obj);
      axios({
        method: "post",
        url: "https://localhost:44394/intakemoment",
        data: {
          medId: this.id,
          id: obj.id,
          frequency: obj.frequency,
          dosage: obj.dosage,
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
        url: "https://localhost:44394/intakemoment",
        data: {
          id: obj.id,
        },
      });
    },
    UpdateIntakemoment(obj) {
      axios({
        method: "put",
        url: "https://localhost:44394/intakemoment",
        data: {
          medId: this.id,
          id: obj.id,
          frequency: obj.frequency,
          dosage: obj.dosage,
          startDate: obj.startDate,
          time: obj.time,
          days: obj.days,
        },
      });
    },
  },
};
</script>
