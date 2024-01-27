import { createStore } from 'vuex'

const initialEvents = [
    { title: 'ir al super', description: "ir al supermercado a comprar 2 barras de pan", start: '2024-01-24T10:30:00' },
    { title: 'clase matematicas', description: "clase de matematicas con pepe", start: '2024-01-28T15:30:00' },
    { title: 'clase de ingles', description: "clase de ingles con pepe", start: '2024-01-28T17:30:00' },
    { title: 'comprar zapatos', description: "zapatos deportivos para el gym", start: '2024-01-31T14:30:00' },
    { title: 'caminar al parque', description: "", start: '2024-01-13T10:15:00' },
].map((event) => ({ ...event, id: crypto.randomUUID() }));

// { title: 'dia festivo', date: '2024-01-24', backgroundColor: 'green' }, // formato para dia festivo

const store = createStore({
    state() {
        return {
            selectedCellDate: null,
            fullCalendar: null,
            events: initialEvents,
            eventSelected: null
        }
    },
    mutations: {
        setSelectedCellDate(state, date) {
            state.selectedCellDate = date;
        },
        setFullCalendar(state, el) {
            state.fullCalendar = el;
        },
        addEventToCalendar(state, event) {
            state.fullCalendar.getApi().addEvent(event);
            state.events = [...state.events, event];
        },
        removeEventFromCalendar(state, event) {
            state.events = state.events.filter((note) => note.id !== event);
        },
        setEventSelected(state, id) {
            state.eventSelected = state.events.find((event) => event.id === id);
        },
        updateEvent(state, event) {
            state.events = state.events.map((item) => (item.id === event.id ? event : item));
        },
    }
})

export default store;