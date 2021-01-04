  <template>
  <div id="app" class="mt-0">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from './components/layout/Header';
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
