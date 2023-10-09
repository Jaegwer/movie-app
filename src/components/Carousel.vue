<template>
	<div class="carousel">
  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    indicators
    img-width="1024"
    img-height="900"
  >
  <b-carousel-slide
        v-for="(movie, index) in upcomingMovies"
        :key="index"
		:text-html="generateTextHTML(movie)"
        :img-src="getImageUrl(movie.poster_path)"
      ></b-carousel-slide>
  </b-carousel>
</div>
</template>

<script >
export default{
	name:"Carousel",
	props:{
		upcomingMovies: Array
	},
	methods:{
		getImageUrl(posterPath) {

      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    },
	generateTextHTML(movie){
		return `<div class="text-start"><h3>${movie.title}</h3><br/>` +`<span>${movie.overview}<span><br/><br/>`+`<p>Release Date: ${movie.release_date}<p></div>`
	}
	}
}
</script>

<style>

</style>