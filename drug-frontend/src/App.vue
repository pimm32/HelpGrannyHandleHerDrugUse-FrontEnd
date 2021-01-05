  <template>
  <div id="app" class="mt-0">
    <Header />
    <router-view/>
    <notifications group="foo" position="bottom left" width=500 ignoreDuplicates />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from './components/layout/Header';
import Vue from 'vue';
import notifications from 'vue-notification';
Vue.use(notifications);
export default {
  name:"app",
  components: {
    Header
  },
    computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
}
</script>


<style>
 </style>
