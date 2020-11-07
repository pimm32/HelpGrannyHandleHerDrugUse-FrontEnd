<template>
  <div id="app">
    
    <AddNewMedicine v-on:add-medicine="AddNewMed"  />
    <div class="container mt-5" >
      <div class="card mt-5">
        <MedicineList
          v-bind:medicineList="medicineList"
          v-on:inspect-medicine="InspectMedicine"
          v-on:del-medicine="DeleteMed"
        />
      </div>
    </div>
  </div>
</template>



<script>
import MedicineList from "../components/MedicineList";
import AddNewMedicine from "../components/AddNewMedicine";
import axios from "axios";
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
      medicineList: [],
    };
  },
  methods: {
    AddNewMed(newMed) {
      axios({
        method: "post",
        url: "localhost:44394/medicine",
        data: {
          name: newMed.name,
          description: newMed.description
        },
      });
    },
    DeleteMed(obj) {
       axios({
        method: "delete",
        url: "localhost:44394/medicine",
        data: {
          id: obj.id,
        },
      });
    },
    InspectMedicine(obj) {
      console.log("inspect button clicked on: " + obj.id);
    },
  },
  // THIS CODE RUNS WHEN A NEW VUE INSTANCE IS CREATED (AKA WHEN THE TABLE IS CALLED FIRST)
  created() {
    axios
      .get("https://i338995core.venus.fhict.nl/Medicine/GetAll")
      .then((res) => (this.medicineList = res.data))
      .catch((err) => console.log(err));
  },
  updated() {
    axios
      .get("https://i338995core.venus.fhict.nl/Medicine/GetAll")
      .then((res) => (this.medicineList = res.data))
      .catch((err) => console.log(err));
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