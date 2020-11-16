@@ -1,20 +1,108 @@
<template>
<div>
    <h2 class="card-header">Inneemmomenten van {{ medicine.name }}</h2>
    <b-table
      fixed
      responsive="true"
      striped
      hover
      :items="medicine.Inneemmomenten"
      :fields=fields
    >
    
    <template v-slot:cell(name)>
      {{medicine.name}}
    </template>
    <template v-slot:cell(intakeMoment)="row">
      {{row.item.dag}}: {{row.item.tijd}}
  
    </template>
      <template v-slot:cell(edit)="row">
        <b-button
          size="sm"
          variant="info"
          @click="edit(row.item, $event.target)"
          class="btn btn-primary"
        >
          Edit</b-button
        >
      </template>
      <template v-slot:cell(delete)="row">
        <b-button
          size="sm"
          variant="info"
          @click="PopUpDelete(row.item, $event.target)"
          class="btn btn-primary"
        >
          Delete</b-button
        >
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "Medicine",
  props: ["medicine"],
  methods: {},
  //props: ["medicine"],
  methods: {
    PopUpDelete: function (obj) {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm(
          "Weet u zeker dat u: " +
             +
            " uit uw medicijnlijst wilt verwijderen?",
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
            this.deleteTIM(obj);
          }
        })
        .catch((err) => console.log(err));
    },
    deleteTIM: function(obj){
      console.log(obj)
      //axios call TODO
    },
    aanpassenTIM: function(){
      
    },
    frontEndDateFormat:function(){

    }
  },
  data() {
    return {
      fields: [
        { key: "name", label: "Naam" },
        { key: "intakeMoment", label: "Moment van inname" },
        { key: "edit", label: "Aanpassen" },
        { key: "delete", label: "Verwijderen" },
      ],
      medicine: {
        name: "paracetamol",
        Inneemmomenten:[
          {date: '2020/11/09', tijd: "13:30"},
          {date: '2020/11/10', tijd: "18:30"},
          {date: "2020/11/11", tijd: "11:30"},
        ]
      }
    };
  },
};
</script>
