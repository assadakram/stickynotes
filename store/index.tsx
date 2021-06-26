import React, { useState, createContext } from "react";
import {Action, Note, Store, StoreState} from "../utils/interfaces";
import { SET_NOTES, UPDATE_NOTES_ORDER, ADD_NOTE, UPDATE_NOTE, DELETE_NOTE } from "./constants";
import {updateData} from "./localStorage";

export const Context = createContext({});

const reducer = (state: any, action: Action) => {
    switch (action.type) {
        case SET_NOTES:
            return {...state, notes: action.payload};
        case UPDATE_NOTES_ORDER:
            updateData("notes", action.payload);
            return {...state, notes: action.payload};
        case ADD_NOTE:
            let main = [action.payload, ...state.notes];
            main = main.map((item, index) => ({...item, index: index}))
            updateData("notes", main);
            return {...state, notes: main};
        case UPDATE_NOTE:
            let updatedNotes = state.notes.map((item: Note) => item.id === action.payload.id ? action.payload : item);
            updateData("notes", updatedNotes);
            return {...state, notes: updatedNotes};
        case DELETE_NOTE:
            let filtered = state.notes.filter((item: Note) => item.id !== action.payload);
            updateData("notes", filtered);
            return {...state, notes: filtered};
        default:
            return state;
    }
};

export const Provider: React.FC<Store> = ({ children }) => {
    const [state, setState] = useState<StoreState>({
        dispatch: (action:Action) => {
            setState((state) => reducer(state, action));
        },
        notes: [],
    });

    return <Context.Provider value={state}>{children}</Context.Provider>;
};