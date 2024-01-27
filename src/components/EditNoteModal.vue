<script setup>
import { validateForm } from '../utils/functions';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const values = ref({ ...store.state.eventSelected });

const formattedDate = () => {
    const [date, time] = store.state.eventSelected.start.split('T');
    return { date, time }
}

const onSubmit = (evt) => {
    const event = validateForm(evt);
    const newNote = {
        ...event,
        id: store.state.eventSelected.id,
    }
    store.commit('updateEvent', newNote);
    store.state.fullCalendar.getApi().getEventById(newNote.id).remove();
    store.state.fullCalendar.getApi().addEvent(newNote);
    store.commit('setEventSelected', null);
}
</script>

<template>
    <div>
        <b-modal hide-header-close no-close-on-backdrop no-close-on-esc visible id="editModal" title="Editar Nota" centered
            hide-footer>
            <b-form @submit="onSubmit">
                <div>
                    <label for="input">Titulo</label>
                    <b-form-input v-model="values.title" name="title" id="input" placeholder="Deberes..."></b-form-input>
                </div>

                <div>
                    <label for="textarea">Descripcion</label>
                    <b-form-textarea v-model="values.description" name="description" id="textarea"
                        placeholder="Ir al super..." rows="3" max-rows="6"></b-form-textarea>
                    <pre class="mt-3 mb-0"></pre>
                </div>

                <div>
                    <label for="datepicker">Seleccionar Fecha</label>
                    <b-form-datepicker v-model="formattedDate().date" name="date" id="datepicker"
                        class="mb-2"></b-form-datepicker>
                </div>

                <div>
                    <label for="timepicker">Seleccionar Hora</label>
                    <b-form-timepicker v-model="formattedDate().time" name="time" id="timepicker"></b-form-timepicker>
                </div>

                <div class="d-flex justify-content-end mt-3">
                    <b-button type="button" class="ml-1" variant="danger"
                        @click="store.commit('setEventSelected', null)">Cancelar</b-button>
                    <b-button type="submit" class="ml-1" variant="primary">Editar Nota</b-button>
                </div>
            </b-form>
        </b-modal>
    </div>
</template>