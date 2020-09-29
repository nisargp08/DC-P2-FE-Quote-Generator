<template>
<div id="app">
    <app-home :api="api"></app-home>
</div>
</template>

<script>
import Home from '@/components/Home';

export default {
    name: 'App',
    data() {
        return {
            //API url
            api: 'https://quote-garden.herokuapp.com/api/v2'
        }
    },
    components: {
        'appHome': Home
    },

}
</script>

<style lang="scss">
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
