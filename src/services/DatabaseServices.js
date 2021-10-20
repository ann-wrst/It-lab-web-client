import {fetchAPI} from "../ApiClient";

export const getDBList = async function getDBLit() {
    return await fetchAPI('/databases');
}
export const createDB = async function createDB(name) {
    const payload = {name: name};
    return await fetchAPI('/databases', payload, 'POST');
}
