<template>
    <div class="responsive-table">
      <h2 class="card-header">Inneem momenten</h2>
    <b-table fixed responsive="true" striped :tbody-tr-class="rowClass" hover :sort-by.sync="sort" :items="intakeList" :fields=fields>
      <template v-slot:cell(date)="row">
      {{row.item.startDate.substring(0,(row.item.startDate.indexOf("T")))}}
      </template>
      <template v-slot:cell(time)="row">
        {{row.item.startDate.substring((row.item.startDate.indexOf("T")+1))}}
      </template>
      <template v-slot:cell(verify)="row">
         <b-button size="sm" variant="info" @click="VerifyIntake(row.item, $event.target)" class="btn btn-primary">
           Afronden           
        </b-button>
      </template>       
    </b-table>
    
    </div>
</template>

<script>

import Vue from 'vue';
import VueResizeText from 'vue-resize-text';
Vue.use(VueResizeText);

export default {
  name: "IntakeMomentListForUser",
  props: ["intakeList"],
  components: {
  },
  data(){
    return{
      sort:"startDate",
      fields:[
        {key: "dosage", label: "Dosering"},
        {key: "medicineName", label: "Med naam"},
        { key: "date", label: "Datum", sortable :"true" },
        {key: "time", label: "Tijd"},
        {key: "verify", label: "Afronden"},

      ]
    }
  },
  methods:{
    rowClass: function(obj, type){
      if(!obj || type!=='row'){
        return;
      }
      let date = new Date(obj.startDate); 
      let currentDate = new Date();
      if(date.toISOString() < currentDate.toISOString() ){
        return "table-danger"
      }
      if(date.toLocaleDateString() === currentDate.toLocaleDateString() ){
        return "table-warning"
      }
      if(date.toISOString() > currentDate.toISOString() ){
        return "table-info"
      }
    },
    VerifyIntake: function(obj){
      this.intakeList.splice(this.intakeList.indexOf(obj), 1);
        this.showWeeklyIntakeModalVerification(obj);
        this.$emit("verify-intake", obj);
    },
    addWeeklyIntake: function(obj){
      this.intakeList = [...this.intakeList, obj];
        this.$emit("weekly-intake", obj);
    },
    showWeeklyIntakeModalVerification: function(obj) {
        this.boxTwo = ''
        this.$bvModal.msgBoxConfirm('Wilt u dit inneem moment inplannen voor volgende week?', {
          title: 'Bevestiging',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Ja',
          cancelVariant: 'primary',
          cancelTitle: 'Nee',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            this.boxTwo = value
            if (value == true) {
              this.addWeeklyIntake(obj)
            }
          })
          .catch(err=>console.log(err))
      }
  }

};
</script>

<style >

</style>