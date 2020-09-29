<template>
<div id="app">
    <div class="bg-background-primary transition-background-25-ease-in" :class="currentTheme">
      <div class="flex flex-col min-h-screen h-full text-copy-primary font-raleway p-4 max-w-screen-md mx-auto md:p-8 xl:max-w-screen-lg">
          <div class="flex items-center justify-between">
              <!-- Theme Switcher -->
              <div>
                  <a href="#" @click.prevent="toggleTheme">
                      <!-- Switch to light -->
                      <svg v-show="currentTheme == 'theme-dark'" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
                      </svg>
                      <!-- Switch to dark -->
                      <svg v-show="currentTheme == 'theme-light'" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                      </svg>
                  </a>
              </div>
              <!-- Random Quote -->
              <div @click="randomQuote" class="flex items-center cursor-pointer hover:text-copy-secondary transition-all-25-ease-in" title="Click to generate a random quote">
                  <svg class="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 6v3l4-4-4-4v3a8 8 0 00-8 8c0 1.57.46 3.03 1.24 4.26L6.7 14.8A5.9 5.9 0 016 12a6 6 0 016-6m6.76 1.74L17.3 9.2c.44.84.7 1.8.7 2.8a6 6 0 01-6 6v-3l-4 4 4 4v-3a8 8 0 008-8c0-1.57-.46-3.03-1.24-4.26z" />
                  </svg>
                  <p class="pl-2">random</p>
              </div>
          </div>
          <div class="flex-1 flex flex-col justify-center">
              <!-- Quote Display -->
              <!-- leading-10 and text-4xl in large remember -->
              <div class="border-l-8 rounded-lg border-boundary-primary">
                  <!-- When error occurs -->
                  <template v-if="errored">
                      <p class="text-center">Error occured while fetching data ! Please try again later...</p>
                  </template>
                  <!-- Display loader when api fetch in progress -->
                  <template v-if="loading">
                      <div class="flex flex-col items-center justify-center">
                          <svg v-if="currentTheme == 'theme-dark'" class="w-16 h-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" preserveAspectRatio="xMidYMid" display="block">
                              <path fill="none" stroke="#e90c59" stroke-width="6.4" stroke-dasharray="42.76482137044271 42.76482137044271" d="M19.44 24C9.12 24 4 34.64 4 40s5.12 16 15.44 16c15.44 0 25.68-32 41.12-32C70.88 24 76 34.64 76 40s-5.12 16-15.44 16c-15.44 0-25.68-32-41.12-32z" stroke-linecap="round" style="transform-origin:50px 50px">
                                  <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625" />
                              </path>
                          </svg>
                          <svg v-if="currentTheme == 'theme-light'" class="w-16 h-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" preserveAspectRatio="xMidYMid" display="block">
                              <path fill="none" stroke="#f7df94" stroke-width="6.4" stroke-dasharray="42.76482137044271 42.76482137044271" d="M19.44 24C9.12 24 4 34.64 4 40s5.12 16 15.44 16c15.44 0 25.68-32 41.12-32C70.88 24 76 34.64 76 40s-5.12 16-15.44 16c-15.44 0-25.68-32-41.12-32z" stroke-linecap="round" style="transform-origin:50px 50px">
                                  <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625" />
                              </path>
                          </svg>
                          <p>Loading...</p>
                      </div>
                  </template>
                  <!-- Display Quote -->
                  <h1 v-if="isDone" class="font-medium text-2xl pl-8 text-copy-primary lg:text-3xl">“{{ quote.quoteText}}”</h1>
              </div>
              <!-- Quote author and Genre -->
              <!-- mt-40 in large -->
              <div v-if="isDone" @mouseout="authorHover = false" @mouseover="authorHover = true" class="flex items-center justify-between mt-16 rounded-lg p-10 hover:bg-background-primary-hover">
                  <!-- leading-7 and text-2xl in large remember -->
                  <div>
                      <h2 class="font-bold text-copy-secondary text-xl lg:text-2xl">{{ quote.quoteAuthor }}</h2>
                      <p class="font-medium text-copy-ternary text-sm leading-4 lg:text-base">{{ quote.quoteGenre }}</p>
                  </div>
                  <div v-if="authorHover">
                      <svg class="w-6 h-6 fill-current text-copy-secondary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                      </svg>
                  </div>
              </div>
          </div>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'App',
    created() {
        this.currentTheme = localStorage.getItem('theme') || 'theme-light';
    },
    mounted() { this.randomQuote() },
    data() {
        return {
            currentTheme: 'theme-light', //By default theme for the site,
            quote: null,
            //Api status
            loading: true,
            isDone: false,
            errored: false,
            //Hover on quote author area
            authorHover : false,
        }
    },
    methods: {
        //Toggles theme between light and dark
        toggleTheme() {
            if (this.currentTheme === 'theme-light') {
                //Switch to dark
                this.currentTheme = 'theme-dark';
            } else {
                //Switch to light
                this.currentTheme = 'theme-light'
            }
            //Persisting Theme
            localStorage.setItem('theme', this.currentTheme);
        },
        //Generate a random quote
        async randomQuote() {
            this.loading = true;
            this.isDone = false;
            this.errored = false;
            try {
                //Fetch from api
                let response = await axios.get('https://quote-garden.herokuapp.com/api/v2/quotes/random')
                //Store fetched api into component variable
                this.quote = response.data.quote;
                this.isDone = true;
            } catch (err) {
                // Log error if occured
                console.log(err);
                this.errored = true;
            }
            this.loading = false;
        }
    },
    components: {},

}
</script>

<style lang="scss">
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
