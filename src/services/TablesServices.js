import {fetchAPI} from "../ApiClient";

export const getTables = async function getTables(db) {
    return await fetchAPI(`/${db}/tables`);
}
export const createTable = async function createTable(db, name, columns) {
    const payload = {name: name, columns: {columns: columns}};
    return await fetchAPI(`/${db}/tables`, payload, 'POST');
}
