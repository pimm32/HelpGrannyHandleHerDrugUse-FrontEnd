<template>
    <div class="responsive-table">
      
      <h2 class="card-header">Inneem momenten</h2>
    <b-table fixed responsive="true" striped hover :items="intakeList" :fields=fields>
      <template v-slot:cell(info)="row">
         <b-button size="sm" variant="info" @click="edit(row.item, $event.target)" class="btn btn-primary">
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
        {key: "dose", label: "Dosering"},
        {key: "frequency", label: "Herhaling"},
        {key: "time", label: "Tijd"},
        {key: "edit", label: "Aanpassen"},
        {key: "delete", label: "Verwijderen"}

      ]
    }
  },
  methods:{
    edit: function(obj){
      this.$emit("edit-intake", obj)
    },
    deleteIntake: function(obj){
      this.$emit("delete-intakemoment", obj);
    },
    showMsgBoxTwo: function(obj) {
        this.boxTwo = ''
        this.$bvModal.msgBoxConfirm('Weet u zeker dat u dit inneem moment wilt verwijderen?', {
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
              this.deleteIntake(obj)
            }
          })
          .catch(err=>console.log(err))
      }
  }

};
</script>

<style >

</style>