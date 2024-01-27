<script setup>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import EditNoteModal from '../components/EditNoteModal.vue';
import AddNoteModal from '../components/AddNoteModal.vue';

const store = useStore();

const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: esLocale,
    dayMaxEventRows: true,
    events: store.state.events,
    eventClick: (info) => {
        if (info.event.allDay) {
            return
        }
        store.commit('setEventSelected', info.event._def.publicId);
    },
    dateClick: (info) => {
        store.commit('setSelectedCellDate', info.dateStr)
        document.querySelector("#open-modal").click();
    },
}

const fullCalendar = ref(null);
onMounted(() => {
    store.commit('setFullCalendar', fullCalendar);
}) 
</script>

<template>
    <FullCalendar ref="fullCalendar" :options="calendarOptions" />
    <AddNoteModal />
    <EditNoteModal v-if="store.state.eventSelected" />
</template>
