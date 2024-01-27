export const validateForm = (evt) => {
    evt.preventDefault();
    const formData = Object.fromEntries(new FormData(evt.target));
    const validate = Object.keys(formData).some(key => formData[key] === '' && key !== 'description');

    const { date, time, ...rest } = formData;
    return {
        event: {
            ...rest,
            start: `${date}T${time}`,
        },
        validate,
    }
}