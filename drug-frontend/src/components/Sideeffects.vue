<template>
    <id>
        <b-list-group>
  <b-list-group-item v-for="effect in effects" :key="effect.value">{{effect}}</b-list-group-item>
 
</b-list-group>
    </id>
</template>

<script>
import axios from 'axios'
export default {
    name: "Sideeffects",
    props:["medicine"],
    data(){
        return{
            effects:[],
        }
    },
    created(){
        axios({
        method: "get",
        url: "https://i338995core.venus.fhict.nl/Medicine/sideeffects/" + this.medicine.id,
    })
    .then((res) => this.effects = res.data)
    .catch((err) => console.log(err));
    },
    updated(){
        axios({
        method: "get",
        url: "https://i338995core.venus.fhict.nl/Medicine/sideeffects/" + this.medicine.id,
    })
    .then((res) => this.effects = res.data)
    .catch((err) => console.log(err));
    },
    }

</script>

<style scoped>

</style>