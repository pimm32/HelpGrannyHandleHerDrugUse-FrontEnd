

<template>
  <div>
    <b-button
      variant="outline-primary"
      v-b-modal.voeg-medicijn-toe-modal
      class="ml-2 mr-2"
      id="add-meds"
    >
      Klik hier om nieuw medicijn toe te voegen!
    </b-button>

    <b-modal
      id="voeg-medicijn-toe-modal"
      ref="modal"
      title="Voeg een medicijn toe"
      ok-title="toevoegen"
      @ok="addMedicine"
      cancel-title="annuleren"
      @cancel="ResetModal"
    >
      <form ref="form" @submit="addMedicine">
        <b-form-group
          label="naam"
          label-for="name-input"
          :class="{ 'form-group--error': $v.name.$error }"
        >
          <b-form-input
            id="name-input"
            v-model.trim="name"
            required
          ></b-form-input>
          <div class="error" v-if="!$v.name.required && showError">
            Naam is verplicht!
          </div>
          <div class="error" v-if="!$v.name.minLength && showError">
            De naam van het medicijn moet minimaal
            {{ $v.name.$params.minLength.min }} karakters zijn!.
          </div>
        </b-form-group>
        <b-form-group
          label="omschrijving"
          label-for="description-input"
          :class="{ 'form-group--error': $v.description.$error }"
        >
          <b-form-input
            id="description-input"
            v-model="description"
            required
          ></b-form-input>
          <div class="error" v-if="!$v.description.required && showError">
            Beschrijving is verplicht!
          </div>
          <div class="error" v-if="!$v.description.maxLength && showError">
            De beschrijving mag uit maximaal
            {{ $v.description.$params.maxLength.max }} karakters bestaan!
          </div>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>


<script>
import Vue from "vue";
import Vuelidate from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
Vue.use(Vuelidate);

export default {
  name: "AddNewMedicine",
  data() {
    return {
      id: 10,
      name: "",
      description: "",
      showError: false,
      showNewMed: false,
    };
  },
  methods: {
    submit() {
      console.log("submit!");
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    addMedicine(e) {
      const newMed = {
        name: this.name,
        description: this.description,
      };

      this.$v.$touch();
      if (this.$v.$invalid) {
        alert("Vul de juiste waarden in voor het nieuwe medicijn!");
        if (e) {
          e.preventDefault();
        }
        this.showError = true;
      } else {
        this.$emit("add-medicine", newMed);

        this.ResetModal();
      }
    },

    ToggleNMS() {
      this.showNewMed = !this.showNewMed;
    },
    ResetModal() {
      this.name = "";
      this.description = "";
      this.showError = false;
    },
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
    description: {
      required,
      maxLength: maxLength(140),
    },
  },
};
</script>

<style scoped>
</style>
