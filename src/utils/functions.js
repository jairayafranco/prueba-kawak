export const validateForm = (evt) => {
    evt.preventDefault();
    const formData = Object.fromEntries(new FormData(evt.target));
    const validate = Object.keys(formData).some(key => formData[key] === '' && key !== 'description');

    if (validate) {
        alert('Todos los campos son obligatorios');
        return
    }

    const { date, time, ...rest } = formData;
    return {
        ...rest,
        start: `${date}T${time}`,
    }
}