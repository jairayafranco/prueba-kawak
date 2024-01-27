<script setup>
import Navbar from './components/Navbar.vue';
</script>

<template>
    <Navbar />
    <div class="m-3">
        <router-view></router-view>
    </div>
</template>
