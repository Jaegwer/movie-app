<template>
  <div class="container">
    <div class="row">
      <div v-for="movie in movies" :key="movie.id" class="col-md-3">
        <b-card
          :title="movie.title"
          :img-src="getImageUrl(movie.poster_path)"
          img-alt="Movie Poster"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-4 movie-card"
        >
          <b-card-text class="movie-description">
            Release Date: {{ movie.release_date }}
          </b-card-text>
          <b-card-text class="movie-description">
            <i class="fa fa-star fa-2x text-warning"></i> {{ movie.vote_average }}/10
          </b-card-text>
          <div class="d-flex justify-content-between mt-2">
            <router-link :to="{ name: 'movie-detail', params: { id: movie.id } }">
              <b-button variant="primary">Details</b-button>
            </router-link>
            <b-button @click="toggleFavorite(movie)" v-if="!isFavorite(movie)" href="#" variant="outline-secondary">
              <i class="fa fa-bookmark"></i>
            </b-button>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    movies: Array,
  },
  computed: {
    ...mapGetters(["favorites"]),
  },
  methods: {
    ...mapActions(["addMovieToFavorites", "removeMovieFromFavorites"]),

    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    },
    isFavorite(movie) {
      return this.favorites.some((fav) => fav.id === movie.id);
    },
    toggleFavorite(movie) {
      if (!this.isFavorite(movie)) {
        this.addMovieToFavorites(movie);
      } else {
        this.removeMovieFromFavorites(movie.id);
      }
    },
  },
};
</script>

<style scoped>
</style>
