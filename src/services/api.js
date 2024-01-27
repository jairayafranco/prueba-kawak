const URL = (endpoint) => `https://date.nager.at/api/v3/${endpoint}`

export const getCountries = async () => {
    const response = await fetch(URL('AvailableCountries'));
    const data = await response.json();
    return data;
}

export const getHolidays = async (country) => {
    const currentYear = new Date().getFullYear();
    const response = await fetch(URL(`PublicHolidays/${currentYear}/${country}`));
    const data = await response.json();
    return data;
}
