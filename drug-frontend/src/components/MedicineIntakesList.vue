<template>
    <div class="responsive-table">
      
      <h2 class="card-header">Inneem momenten</h2>
    <b-table fixed responsive="true" striped hover :items="intakeList" :fields=fields>
      <template v-slot:cell(info)="row">
         <b-button size="sm" variant="info" @click="info(row.item, $event.target)" class="btn btn-primary">
           Aanpassen           
        </b-button>
      </template>
      <template v-slot:cell(delete)="row">
        <b-button class="btn" variant="danger" size="sm" @click="showMsgBoxTwo(row.item, $event.target)">
          Verwijder 
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
  name: "IntakeList",
  props: ["intakeList"],
  components: {

  },
  data(){
    return{
      fields:[
        {key: "name", label: "Medicijn"},
        {key: "dose", label: "Dosering"},
        {key: "date", label: "Datum"},
        {key: "time", label: "Tijd"},
        {key: "edit", label: "Aanpassen"},
        {key: "delete", label: "Verwijderen"}

      ]
    }
  },
  methods:{
    info: function(obj){
      this.$emit("edit-intake", obj)
    },
    deleteMed: function(obj){
      this.$emit("del-intake", obj);
    },
    showMsgBoxTwo: function(obj) {
        this.boxTwo = ''
        this.$bvModal.msgBoxConfirm('Weet u zeker dat u: ' + obj.name + ' uit uw medicijnlijst wilt verwijderen?', {
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
              this.deleteMed(obj)
            }
          })
          .catch(err=>console.log(err))
      }
  }

};
</script>

<style >

</style>