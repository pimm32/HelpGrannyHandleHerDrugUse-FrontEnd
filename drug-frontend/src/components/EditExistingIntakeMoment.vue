<template>
  <div>
{{intake}}
    <b-modal
      id="pas-inname-aan-modal"
      ref="modal"
      title="Inname-moment"
      ok-title="aanpassen"
      @ok="editIntake"
      cancel-title="annuleren"
      
      >
    <b-form>
      <b-row>
          
          <b-col cols="6">
            <b-form-group
              id="input-group-1"
              label="Hoeveelheid:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                type="number"
                v-model="form.dosage"
                required
                placeholder="Hoeveelheid"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              id="input-group-2"
              label="Doserings vorm:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                type="text"
                v-model="form.dosageForm"
                required
                placeholder="Dosering"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

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
      name: "EditExistingIntakeMoment",
      props: ["intake"],
    data() {
      return {
          showEditIntake: false, 
          personalised: false,
        form: {
          frequency: null,
          dosage: null,
        dosageForm: null,

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
    editIntake() {    
      const NEWINTAKE = {
        id: this.intake.id,
        frequency: this.form.frequency,
        dosage: this.form.dosage,
        startDate: this.form.startDate,
        time: this.form.time
      };
      this.$emit("edit-intakemoment", NEWINTAKE);
    },
    
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.dose = this.intake.dosage;
        this.form.frequency = this.intake.frequency;
        this.form.checked = this.intake.checked;
        this.startDate = this.intake.startDate;
        this.time = this.intake.time;   
      }
    }
  }
</script>