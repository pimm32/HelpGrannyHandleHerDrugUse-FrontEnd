<template>
  <div>
    <b-button variant="outline-primary" v-b-modal.voeg-Inname-toe-modal class="ml-2 mr-2">
      Nieuw inneem moment toevoegen
    </b-button>

    <b-modal
      id="voeg-Inname-toe-modal"
      ref="modal"
      title="Inname-moment"
      ok-title="toevoegen"
      @ok="addIntake"
      cancel-title="annuleren"
      >
    <b-form v-if="show">
      <b-form-group
        id="input-group-1"
        label="Dosering:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.dosage"
          required
          placeholder="Dosering"
        ></b-form-input>
      </b-form-group>

     <div>
    <label for="example-datepicker">Start datum: </label>
    <b-form-datepicker id="example-datepicker" class="mb-2" v-model="form.startDate"></b-form-datepicker>
  </div>
   <div>
     <label for="time">Inneem tijd: </label>
    <b-form-timepicker id="time" locale="nl" v-model="form.time"></b-form-timepicker>

  </div>

      <b-form-group id="input-group-3" label="Herhaling:" label-for="input-3">
        <b-form-select 
          id="input-3"
          @change="onChange()"
          v-model="form.frequency"
          :options="frequencies"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4" v-show="personalised">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="0">Maandag</b-form-checkbox>
          <b-form-checkbox value="1">Dinsdag</b-form-checkbox>
          <b-form-checkbox value="2">Woensdag</b-form-checkbox>
          <b-form-checkbox value="3">Donderdag</b-form-checkbox>
          <b-form-checkbox value="4">Vrijdag</b-form-checkbox>
          <b-form-checkbox value="5">Zaterdag</b-form-checkbox>
          <b-form-checkbox value="6">Zondag</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
    </b-form>
    </b-modal>
  </div>
</template>

<script>
  export default {
      name: "NewMedicineIntake",
    data() {
      return {
          showNewIntake: false, 
          personalised: false,
        form: {
          frequency: null,
          dosage: null,
          checked: []
        },
        frequencies: [{ text: 'Dagelijks', value: 0 }, { text: 'Wekelijks', value: 1 }, { text: 'Zelf instellen', value: 2 }],
        show: true
      }
    },
    methods:{
       onChange() {
         if (this.form.frequency == 2) {
           console.log(this.form.frequency)
           this.personalised = true;
         }
         else{
           this.personalised = false;
         }
       },
    addIntake() {
      
      const NEWINTAKE = {
        frequency: this.form.frequency,
        dosage: this.form.dosage,
        startDate: this.form.startDate,
        time: this.form.time
      };
      this.$emit("add-intakemoment", NEWINTAKE);
    },
    ToggleNMS() {
      this.showNewIntake = !this.showNewIntake;
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.dose = ''
        this.form.frequency = null
        this.form.checked = []
        
      }
    }
  }
</script>