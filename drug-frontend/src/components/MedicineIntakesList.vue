<template>
  <div class="responsive-table">
    
    <h2 class="card-header">Inneem momenten</h2>
    <b-table
      fixed
      responsive="true"
      striped
      hover
      :items="intakeList"
      :fields="fields"
    >
      <template v-slot:cell(date)="row">
        {{ row.item.startDate.substring(0, row.item.startDate.indexOf("T")) }}
      </template>
      <template v-slot:cell(time)="row">
        {{ row.item.startDate.substring(row.item.startDate.indexOf("T") + 1) }}
      </template>
      
      <template v-slot:cell(delete)="row">
        <b-button
          class="btn"
          variant="danger"
          size="sm"
          @click="DeleteVerificatie(row.item, $event.target)"
        >
        
        
          Verwijder
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import Vue from "vue";
import VueResizeText from "vue-resize-text";
Vue.use(VueResizeText);

export default {
  name: "IntakeList",
  props: ["intakeList"],
  components: {
  },
  data() {
    return {
      showEditIntake: false,
      editableIntake: null,
      fields: [
        { key: "dosage", label: "Dosering" },
        { key: "frequency", label: "Herhaling" },
        { key: "date", label: "Datum" },
        { key: "time", label: "Tijd" },
        { key: "delete", label: "Verwijderen" },
      ],
    };
  },
  mounted: function(){
    this.showEditIntake= false;
  },
  methods: {
    edit: function (obj) {
      this.showEditIntake= true,
      this.editableIntake = obj
      this.$bvModal.show("showEditIntake");
    },
    edit2: function(obj){
      this.$$emit("edit-intakemoment", obj);
      this.showEditIntake = false;
    },
    deleteIntake: function (obj) {
      this.$emit("delete-intakemoment", obj);
    },
    DeleteVerificatie: function (obj) {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm(
          "Weet u zeker dat u dit inneem moment wilt verwijderen?",
          {
            title: "Bevestiging",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "Ja",
            cancelVariant: "primary",
            cancelTitle: "Nee",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          this.boxTwo = value;
          if (value == true) {
            this.deleteIntake(obj);
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style >
</style>