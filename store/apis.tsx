import {ADD_NOTE, SET_NOTES, UPDATE_NOTE, DELETE_NOTE} from "./constants";
import data from "../data.json";
import {Note} from "../utils/interfaces";
import {getData} from "./localStorage";
interface Interface {
    type: string;
    payload: any;
}
//For connecting the FE With API
export const getNotes = (dispatch: (data: Interface ) => void) => {
    let notes = getData("notes");
    notes = notes ? JSON.parse(notes) : "";
    dispatch({
        type: SET_NOTES,
        payload: notes ? notes : data
    });
};

export const addNote = (dispatch: (data: Interface) => void, note: Note) => {
    dispatch({
        type: ADD_NOTE,
        payload: note
    });
}

export const updateNote = (dispatch: (data: Interface) => void, note: Note) => {
    dispatch({
        type: UPDATE_NOTE,
        payload: note
    });
}
export const deleteNote = (dispatch: (data: Interface) => void, id: string) => {
    dispatch({
        type: DELETE_NOTE,
        payload: id
    });
}