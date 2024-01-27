<script setup>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { ref } from 'vue';
import { useStore } from 'vuex';
import EditNoteModal from '../components/EditNoteModal.vue';
import AddNoteModal from '../components/AddNoteModal.vue';
import SelectCountry from '../components/SelectCountry.vue';

const store = useStore();

const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: esLocale,
    eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    },
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
store.commit('setFullCalendar', fullCalendar);
</script>

<template>
    <SelectCountry />
    <FullCalendar ref="fullCalendar" :options="calendarOptions" />
    <AddNoteModal />
    <EditNoteModal v-if="store.state.eventSelected" />
</template>
