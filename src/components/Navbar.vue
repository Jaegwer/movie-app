<template>
	<div>
	  <!-- Navbar -->
	  <b-navbar variant="faded" type="dark" class="bg-dark">
		<div class="container">
		  <b-navbar-brand tag="h1" class="mb-0">

			<i class="fa fa-film"></i> Movie Star</b-navbar-brand>
		  <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>


		  <b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav class="mr-auto d-block d-md-none d-lg-none">
			  <b-nav-item to="/" >Home</b-nav-item>
			  <b-nav-item to="/Favorites">Favorites</b-nav-item>
			</b-navbar-nav>

			<b-navbar-nav>
			  <b-nav-form>
				<b-input-group size="sm">
				  <b-form-input v-model="searchQuery" placeholder="Search"></b-form-input>
				  <b-input-group-append>
					<b-button size="sm" class=" my-sm-0" @click="updateSearchQuery">
					  <i class="fa fa-search"></i>
					</b-button>
				  </b-input-group-append>
				</b-input-group>
			  </b-nav-form>
			</b-navbar-nav>
		  </b-collapse>
		</div>
	  </b-navbar>

	  <b-sidebar
	  class="d-none d-md-block d-lg-block"
		id="sidebar-right"
		left
		visible
		shadow
		width="75px"
		no-header-close
		no-close-on-route-change
		bg-variant="dark"
	  >
		<div class="px-3 py-2 d-flex flex-column">
		  <router-link to="/">
			<i class="fa fa-home fa-2x mb-3 text-white home"></i>
		  </router-link>
		  <router-link to="/Favorites">
			<i class="fa fa-star fa-2x text-white fav"></i>
		  </router-link>
		</div>
	  </b-sidebar>
	</div>
  </template>

  <script>
  import { mapState, mapActions } from "vuex";
  import { EventBus } from './EventBus';

  export default {
	name: "Navbar",
	computed: {
	  ...mapState({
		searchResults: "searchResults",
	  }),
	  searchQuery: {
		get() {
		  return this.$store.state.searchQuery;
		},
		set(value) {
		  this.$store.commit("SET_SEARCH_QUERY", value);
		},
	  },
	},
	methods: {
	  ...mapActions(["searchMovies"]),
	  async updateSearchQuery() {
		await this.searchMovies();
		EventBus.$emit('open-modal', { showModal: true, searchResults: this.searchResults });
	  },
	},
  };
  </script>

  <style scoped>

  </style>
