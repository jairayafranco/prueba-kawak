<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
    store.commit('setFilteredEvents', store.state.events);
});

const filterEvents = (text) => {
    const filteredEvents = store.state.events.filter((event) => {
        const fullText = `${event.title} ${event.description}`;
        return fullText.includes(text.toLowerCase());
    });
    store.commit('setFilteredEvents', filteredEvents)
}
</script>

<template>
    <div class="m-2">
        <b-form-input @input="filterEvents" placeholder="Buscar nota..."></b-form-input>
    </div>

    <h2 v-if="store.state.events.length === 0" class="text-center">
        No hay eventos creados
    </h2>

    <h2 v-else-if="store.state.filteredEvents.length === 0" class="text-center">
        No hay coincidencias
    </h2>

    <b-list-group v-else v-for="note in store.state.filteredEvents">
        <b-list-group-item class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">• {{ note.title }}</h4>
                <small>{{ new Date(note.start).toLocaleString() }}</small>
            </div>

            <div class="d-flex w-100 justify-content-between">
                <p class="mb-1">
                    {{ note.description }}
                </p>
                <b-button variant="danger" size="sm" @click="store.commit('removeEventFromCalendar', note.id)">
                    X
                </b-button>
            </div>

        </b-list-group-item>
    </b-list-group>
</template>

<style scoped>
.card-buttons {
    display: flex;
    gap: 0.2em;
}
</style>