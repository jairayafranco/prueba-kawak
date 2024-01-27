<script setup>
import { useStore } from 'vuex';
import { validateForm } from '../utils/functions';

const store = useStore();

const onSubmit = (evt) => {
    const { event, validate } = validateForm(evt);

    if (validate) {
        alert('Los campos Titulo y Hora son obligatorios');
        return
    }

    const newEvent = {
        ...event,
        id: crypto.randomUUID()
    }
    store.commit('addEventToCalendar', newEvent);
    document.querySelector("#addModal").click();
}
</script>

<template>
    <div>
        <b-button id="open-modal" v-b-modal.addModal hidden>Launch modal</b-button>

        <b-modal id="addModal" title="Agregar Nota" centered hide-footer no-close-on-backdrop no-close-on-esc>
            <b-form @submit="onSubmit">
                <div>
                    <label for="input">Titulo</label>
                    <b-form-input name="title" id="input" placeholder="Deberes..."></b-form-input>
                </div>

                <div class="mt-2">
                    <label for="textarea">Descripcion (opcional)</label>
                    <b-form-textarea name="description" id="textarea" placeholder="Ir al super..." rows="3"
                        max-rows="6"></b-form-textarea>
                    <pre class="mt-3 mb-0"></pre>
                </div>

                <div>
                    <label for="datepicker">Seleccionar Fecha</label>
                    <b-form-datepicker name="date" id="datepicker" class="mb-2"
                        v-model="store.state.selectedCellDate"></b-form-datepicker>
                </div>

                <div>
                    <label for="timepicker">Seleccionar Hora</label>
                    <b-form-timepicker name="time" id="timepicker"></b-form-timepicker>
                </div>

                <div class="d-flex justify-content-end mt-3">
                    <b-button type="submit" class="ml-1" variant="primary">Crear Nota</b-button>
                </div>
            </b-form>
        </b-modal>
    </div>
</template>