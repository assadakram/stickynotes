import {Note} from "../utils/interfaces";

export const getData = (key: string) => {
    let data = localStorage.getItem(key);
    return data ? data : "";
}

export const updateData = (key: string, data: Note[]) => {
    localStorage.setItem(key, JSON.stringify(data));
}