<template>
<div class="flex-1 flex flex-col">
    <div role="button" @click="backToParent()" class="flex items-center my-8">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
        </svg>
        <p class="pl-2">Go Back</p>
    </div>
    <div class="flex-1 flex flex-col justify-center">
        <!-- Quote Display -->
        <div>
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
            <template v-if="isDone">
                <h2 class="font-bold text-3xl leading-10 text-copy-secondary">{{author}}</h2>
                <div v-for="quote in authorQuotes" :key="quote._id" class="border-l-8 rounded-lg border-boundary-primary my-8">
                    <h3 class="font-medium text-xl pl-8 text-copy-primary lg:text-2xl">“{{ quote.quoteText}}”</h3>
                </div>
            </template>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Author",
    mounted() {
        this.generateAuthorQuotes(this.author)
    },
    props: {
        author: {
            type: String,
            required: true,
        },
        api: {
            type: String,
            required: true,
        },
        currentTheme: String
    },
    data() {
        return {
            authorQuotes: null,
            //Api status
            loading: true,
            isDone: false,
            errored: false,
        }
    },
    methods: {
        //Generate author quotes
        async generateAuthorQuotes(author) {
            this.loading = true;
            this.isDone = false;
            this.errored = false;
            try {
                //Fetch from api
                let response = await axios.get(`${this.api}/authors/${author}?page=1&limit=10`)
                //Store fetched api into component variable
                if (response.data.quotes) {
                    this.authorQuotes = response.data.quotes;
                    this.isDone = true;
                }
            } catch (err) {
                // Log error if occured
                console.log(err);
                this.errored = true;
            }
            this.loading = false;

        },
        backToParent() {
            this.$emit('back-from-child');
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
    }
}
</script>

<style>

</style>
