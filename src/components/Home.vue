<template>
<div class="bg-background-primary transition-background-25-ease-in" :class="currentTheme">
    <div class="flex flex-col min-h-screen h-full text-copy-primary font-raleway p-4 max-w-screen-md mx-auto md:p-8 xl:max-w-screen-lg">
        <app-navbar @theme="setTheme">
            <template v-slot:menuItem>
                <!-- Random Quote -->
                <div @click="randomQuote" class="flex items-center cursor-pointer hover:text-copy-secondary transition-all-25-ease-in" title="Click to generate a random quote">
                    <svg class="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 6v3l4-4-4-4v3a8 8 0 00-8 8c0 1.57.46 3.03 1.24 4.26L6.7 14.8A5.9 5.9 0 016 12a6 6 0 016-6m6.76 1.74L17.3 9.2c.44.84.7 1.8.7 2.8a6 6 0 01-6 6v-3l-4 4 4 4v-3a8 8 0 008-8c0-1.57-.46-3.03-1.24-4.26z" />
                    </svg>
                    <p class="pl-2">random</p>
                </div>
            </template>
        </app-navbar>
        <template v-if="isIndex">
            <div class="flex-1 flex flex-col justify-center">
                <!-- Quote Display -->
                <div class="border-l-8 rounded-lg border-boundary-primary">
                    <!-- When error occurs -->
                    <template v-if="apiError">
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
                <div v-if="isDone" @click="setAuthorComponent()" @mouseout="authorHover = false" @mouseover="authorHover = true" class="flex items-center justify-between mt-16 rounded-lg p-10 hover:bg-background-primary-hover">
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
        </template>
        <!-- Dynamic Component -->
        <component @back-from-child="setView" :is="currentView" v-bind="currentProperties"></component>
        <footer class="mt-8">
            <p class="font-montserrat font-bold text-sm text-copy-ternary text-center">Nisarg Patel @ Devchallenges.io</p>
        </footer>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Author from '@/components/Author';

export default {
    name: 'Home',
    mounted() { this.randomQuote() },
    props: {
        api: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            //Component Change tracker
            isIndex : true,
            currentView : '',

            currentTheme: '', //Set by child
            quote: null,
            //Api status
            loading: true,
            isDone: false,
            errored: false,
            //Hover on quote author area
            authorHover: false,
        }
    },
    computed: {
        apiError() {
            if (this.errored == true && this.quote == null) {
                return true;
            } else {
                return false;
            }
        },
        currentProperties(){
            //The properties which we want to pass to our dynamic component
            if(this.currentView == Author){
                return { 
                    api : this.api,
                    author : this.quote.quoteAuthor,
                    currentTheme : this.currentTheme, 
                };
            } else {
                return "";
            }
        },
    },
    methods: {
        //Generate a random quote
        async randomQuote() {
            this.loading = true;
            this.isDone = false;
            this.errored = false;
            try {
                //Fetch from api
                let response = await axios.get(`${this.api}/quotes/random`)
                //Store fetched api into component variable
                if (response.data.quote) {
                    this.quote = response.data.quote;
                    this.isDone = true;
                }
            } catch (err) {
                // Log error if occured
                console.log(err);
                this.errored = true;
            }
            this.loading = false;
        },
        setAuthorComponent() {
            this.currentView = Author;
            this.isIndex = false;
        },
        setView(){
            this.isIndex = true;
            this.currentView = '';
        },
        setTheme(theme) {
            //Update the currentTheme to the value received from child
            this.currentTheme = theme;
        }
    },
    components: {
        'appNavbar': Navbar,
        Author,
    },

}
</script>
