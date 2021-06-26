import { ReactNode } from "react";

export interface Note {
    id: string;
    name: string;
    description: string;
    color: string;
    date: string;
    star: boolean;
    index: number
}

export interface ConfirmationModel {
    title: string;
    message: string;
    buttonHandler: (flag: boolean) => void;
    visible:boolean;
    setVisible: any;
}

export interface NoteProps {
    dispatch: any;
    item: Note;
    index: number;
    notes: Note[];
}

export interface PopupProps {
    visible: boolean;
    setVisible: any;
    dispatch: any;
    isEditing: boolean;
    formData?: Note;
}


export interface Store {
    children: ReactNode
}

export interface Action {
    type: string;
    payload: any;
}

export type StoreState = {
    dispatch: (value: Action ) => void;
    notes: Note[];
}