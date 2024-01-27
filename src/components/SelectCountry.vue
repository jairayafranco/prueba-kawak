<script setup>
import { ref } from 'vue';
import { getCountries, getHolidays } from '../services/api';
import { useStore } from 'vuex';

const selected = ref(null);
const options = ref([]);
const store = useStore();
const calendar = () => store.state.fullCalendar.getApi();
const getHolidaysFromCalendar = () => calendar().getEventSources();

getCountries().then((data) => {
    options.value = data.map(({ countryCode, name }) => {
        return {
            value: countryCode,
            text: name
        }
    });
});

const onChangeContry = (evt) => {
    if (getHolidaysFromCalendar().length > 1) {
        getHolidaysFromCalendar()[1].remove();
    }

    getHolidays(evt).then((data) => {
        const holidays = data.map(({ localName, date }) => ({
            title: localName,
            date: date,
            backgroundColor: "green",
        }));
        calendar().addEventSource(holidays);
    });
}

const cleanCalendar = () => {
    if (getHolidaysFromCalendar().length > 1) {
        getHolidaysFromCalendar()[1].remove();
    }
    selected.value = null;
}
</script>

<template>
    <div class="d-flex align-items-center mb-2">
        <b-form-select class="w-25" v-model="selected" :options="options" @change="onChangeContry">
            <template #first>
                <b-form-select-option :value="null" disabled>Ver festivos de pais</b-form-select-option>
            </template>
        </b-form-select>
        <b-button type="submit" class="ml-1" variant="info" @click="cleanCalendar">Limpiar</b-button>
    </div>
</template>
