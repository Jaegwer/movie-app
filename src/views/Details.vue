<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col">
        <img class="" :src="getImageUrl(movieDetails.poster_path)" alt="" />
      </div>

      <div class="col">
        <ul class="d-flex list-unstyled">
          <li
            v-for="genre in movieDetails.genres"
            :key="genre.id"
            class="mx-2 text-warning border rounded-pill border-dark p-2"
          >
            {{ genre.name }}
          </li>
        </ul>
        <h1>{{ movieDetails.title }} ({{ movieDetails.status }})</h1>
        <div class="d-flex">
          <p class="mr-3">{{ getReleaseYear(movieDetails.release_date) }}</p>
          <a class="text-warning mx-3" :href="getImdbUrl(movieDetails.imdb_id)">
            <i class="fa fa-imdb fa-2x"></i>
          </a>
          <p class="ml-3">{{ formatRuntime(movieDetails.runtime) }}</p>
        </div>

        <p>{{ movieDetails.overview }}</p>
        <i class="fa fa-star fa-2x text-warning"></i>
        {{ movieDetails.vote_average.toFixed(1) }}/10
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  computed: {
    movieId() {
      return this.$store.state.movieId;
    },
    movieDetails() {
      return this.$store.state.detailData;
    },
  },
  created() {
    const movieId = this.$route.params.id;
    this.$store.dispatch("setMovieIdAction", movieId);
    this.$store.dispatch("fetchMovieDetailsAction");
  },
  methods: {
    getImageUrl(posterPath) {
      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    },
    getReleaseYear(dateString) {
      const date = new Date(dateString);
      return date.getFullYear().toString();
    },
    formatRuntime(runtime) {
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      return `${hours}h ${minutes}m`;
    },
    getImdbUrl(imdbId) {
      return `https://www.imdb.com/title/${imdbId}/`;
    },
  },
};
</script>
