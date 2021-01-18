<template>
  <div id="app">
    <div v-if="this.user.data">
    <AddNewMedicine v-on:add-medicine="AddNewMed" />
    <div class="container mt-5">
      <div class="card mt-5">
        <MedicineList
          ref="medList"
          v-bind:medicineList="medicineList"
          v-on:inspect-medicine="InspectMedicine"
          v-on:del-medicine="DeleteMed"
        />
      </div>
    </div>
    </div>
    <div v-else>
      Oops er gaat iets fout
    </div>
  </div>
</template>

<script>
import MedicineList from "../components/MedicineList";
import AddNewMedicine from "../components/AddNewMedicine";
import axios from "axios";
import { mapGetters } from "vuex";
import Vue from "vue";
import VueResizeText from "vue-resize-text";
Vue.use(VueResizeText);

export default {
  name: "MedicineListPage",
  components: {
    MedicineList,
    AddNewMedicine,
  },
  data() {
    return {
      rendered: true,
      medicineList: [],
      listFilled: false,
    };
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  methods: {
    AddNewMed(newMed) {
      this.medicineList = [...this.medicineList, newMed];
      axios({
        method: "post",
        url: "https://i338995core.venus.fhict.nl/Medicine/",
        data: {
          name: newMed.name,
          description: newMed.description,
          UID: this.user.data.uid,
        },
      }).then((res) => (this.medicineList, [...this.medicineList, res.data]));
      this.Notificatie(
        "Medicijn toegevoegd",
        "Het medicijn " + newMed.name + " is succesvol toegevoegd!",
        "success"
      );
    },
    DeleteMed(obj) {
      this.medicineList.splice(this.medicineList.indexOf(obj), 1);
      axios({
        method: "delete",
        url: "https://i338995core.venus.fhict.nl/Medicine/" + obj.id,
      });
      this.Notificatie(
        "Medicijn verwijderd",
        "Het medicijn " + obj.name + " is succesvol verwijderd!",
        "error"
      );
    },

    InspectMedicine(obj) {
      this.$router.push({ name: "MedicineDetail", params: { medicine: obj } });
    },
    Notificatie(_title, _text, _type) {
      this.$notify({
        group: "foo",
        title: _title,
        text: _text,
        duration: 10000,
        type: _type,
      });
    },
  },
  // THIS CODE RUNS WHEN A NEW VUE INSTANCE IS CREATED (AKA WHEN THE TABLE IS CALLED FIRST)
  mounted() {
    if (this.user.data) {
      axios
        .get(
          "https://i338995core.venus.fhict.nl/Medicine/GetAllByAccountId/" +
            this.user.data.uid
        )
        .then(
          (res) => ((this.medicineList = res.data), (this.listFilled = true))
        )
        .catch((err) => console.log(err));
    }
  },
  updated() {
    if ((this.user.data && !this.listFilled)) {
      axios
        .get(
          "https://i338995core.venus.fhict.nl/Medicine/GetAllByAccountId/" +
            this.user.data.uid
        )
        .then(
          (res) => ((this.medicineList = res.data), (this.listFilled = true))
        )
        .catch((err) => console.log(err));
    }
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
