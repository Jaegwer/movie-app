<template>
  <div class="container">
    <h2>Favorite Movies</h2>
    <div class="row">
      <div v-for="movie in this.favorites" :key="movie.id" class="col-md-4 mb-4">
        <div class="card card-01 height-fix">
          <img
            class="card-img-top"
            :src="getImageUrl(movie.poster_path)"
            alt="Card image cap"
          />
          <div class="card-img-overlay">
            <h4 class="card-title text-info">
              <strong> {{ movie.title }}</strong>
            </h4>
            <p class="card-text text-info">
              <strong> Release Date: {{ movie.release_date }}</strong>
            </p>
            <p class="card-text text-info">
              <i class="fa fa-star fa-2x text-warning"></i>
              {{ movie.vote_average }}/10
            </p>
            <button
              @click="removeFromFavorites(movie.id)"
              class="btn btn-outline-danger"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Favorites",
  props: {
    movies: Array,
  },
  computed: {
    ...mapGetters(["favorites"]),
  },
  methods: {
    ...mapActions(["removeMovieFromFavorites"]),
    removeFromFavorites(movieId) {
      this.removeMovieFromFavorites(movieId);
    },
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    },
  },
};
</script>
