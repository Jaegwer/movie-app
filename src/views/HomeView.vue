<template>
  <div>
    <Carousel :upcoming-movies="upcomingData"/>
    <MovieCard :movies="movieData" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Carousel from "../components/Carousel.vue";
import MovieCard from "../components/MovieCard.vue";
export default {

  components: {
    Carousel,
    MovieCard,
  },
  computed:{
	...mapState(['movieData','upcomingData']),
  },
  created(){
	this.fetchData();
	this.fetchUpcoming();
  },
  methods: {
    async fetchData() {
      try {
        await this.$store.dispatch("fetchMovies");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async fetchUpcoming() {
      try {
        await this.$store.dispatch("fetchUpcomingMovies");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>
<style>

</style>
