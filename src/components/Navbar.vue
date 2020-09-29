<template>
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
    <slot name="menuItem"></slot>
</div>
</template>

<script>
export default {
    created() {
        this.currentTheme = localStorage.getItem('theme') || 'theme-dark';
        //Send theme data to parent
        this.getCurrentTheme();
    },
    data() {
        return {
            currentTheme: 'theme-dark', //By default theme for the site,
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
            //Send changes to parent
            this.getCurrentTheme();
        },
        //Emits an event with current active theme
        getCurrentTheme() {
            this.$emit('theme', this.currentTheme);
        }
    }
}
</script>

<style>

</style>
