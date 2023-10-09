<template>
  <b-modal v-model="showModal" title="Search Results">
    <ul>
      <li
        class="list-unstyled d-flex align-items-center mb-5 "
        v-for="result in searchResults.results"
        :key="result.id"
      >
        <b-img
          class="w-25"
          :src="getImageUrl(result.poster_path)"
          alt="Fluid image"
        ></b-img>
        <router-link class="text-decoration-none text-black go-detail" :to="{ name: 'movie-detail', params: { id: result.id } }">
          <p>{{ result.title }}</p></router-link
        >
      </li>
    </ul>
  </b-modal>
</template>

<script>
import { EventBus } from "./EventBus";
export default {
  name: "ResultModal",
  data() {
    return {
      showModal: false,
      searchResults: [],
    };
  },
  created() {
    EventBus.$on("open-modal", ({ showModal, searchResults }) => {
      this.showModal = showModal;
      this.searchResults = searchResults;
    });
  },
  methods: {
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    },
  },
};
</script>
