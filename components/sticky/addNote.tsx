import React, { useState } from "react";
import Popup from "./popup";

interface AddNoteProps {
    dispatch: any
}

const AddNote: React.FC<AddNoteProps> = ({ dispatch }) => {
    const [ visible, setVisible ]  = useState(false);

    const addNote = () => {
        setVisible(true);
    }

    return (
        <div className="flex items-center">
            {
                visible &&
                <Popup visible={visible} setVisible={setVisible} dispatch={dispatch} isEditing={false}/>
            }
            <p className="text-2xl xl:text-3xl 2xl:text-4xl font-bold">Notes</p>
            <div onClick={() => addNote()} className="ml-2 hover flex items-center justify-center bg-black rounded-full p-1 text-white font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="30"
                     height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                     strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
            </div>
        </div>
    )
}

export default AddNote