import React, {useEffect, useState, SyntheticEvent} from "react";
import Popup from 'reactjs-popup';
import ReactColorPicker from '@super-effective/react-color-picker';
import {v4 as uuidv4} from "uuid";
import {PopupProps} from "../../utils/interfaces";
import { ADD_NOTE, UPDATE_NOTE } from "../../store/constants";
import {addNote, updateNote} from "../../store/apis";
const PopupComponent: React.FC<PopupProps> = ({visible, setVisible, dispatch, isEditing, formData}) => {

    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("#3cd6bf");
    const [date, setDate] = useState("");

    useEffect(() => {
        if(isEditing && formData){
            setLabel(formData.name);
            setDescription(formData.description);
            setColor(formData.color);
            setDate(formData.date);
        }
    }, [isEditing]);

    const saveNote = (event: SyntheticEvent) => {
        event.preventDefault();
        let payload = {
            id: "",
            name: label,
            description: description,
            color: color,
            date: date,
            star: false,
            index: 0
        }
        if(!isEditing){
            payload.id = uuidv4();
            addNote(dispatch, payload);
        } else {
            payload.id = formData ? formData.id : "";
            updateNote(dispatch, payload);
            dispatch({
                type: UPDATE_NOTE,
                payload: payload,
            })
        }
        setVisible(false);
    }

    return (
        <Popup open={visible} closeOnDocumentClick onClose={() => setVisible(false)}>
            <div className="relative">
                <p className="font-bold text-3xl text-center py-8">
                    {isEditing ? "Update": "Add"} Note
                </p>
                <form onSubmit={saveNote} className="bg-white z-50 flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2 p-4">
                        <div className="flex flex-col w-full">
                            <label htmlFor="label"
                                   className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">Name</label>
                            <input aria-label="enter username" type="text" id="label" name="label"
                                   onChange={event => setLabel(event.target.value)}
                                   value={label}
                                   className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-800 bg-transparent dark:text-gray-100"
                                   placeholder="Name" required/>
                        </div>
                        <div className="mt-4 flex flex-col w-full">
                            <label htmlFor="description"
                                   className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">Description</label>
                            <textarea aria-label="enter information about yourself" id="description" name="description"
                                      onChange={event => setDescription(event.target.value)}
                                      value={description}
                                      className=" h-40 border border-gray-300 dark:border-gray-700 pl-3 py-2 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent resize-none text-gray-800 dark:text-gray-100"
                                      placeholder="Explain more" required/>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 pr-4 py-4 ml-4 lg:ml-0 ">
                        <div className="flex flex-col w-full">
                            <label htmlFor="color" className="text-sm font-bold text-gray-800 dark:text-gray-100">Color</label>
                            <ReactColorPicker color={color} onChange={setColor} className="-ml-2" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="date"
                                   className="pb-2 mt-4 text-sm font-bold text-gray-800 dark:text-gray-100">Date</label>
                            <input aria-label="enter date" type="date" id="date" name="date"
                                   onChange={event => setDate(event.target.value)}
                                   value={date}
                                   className="border w-full border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 text-gray-800 bg-transparent dark:text-gray-100"
                                   placeholder="Date" required/>
                        </div>
                        <div className="w-full flex justify-end mt-8 ml-2 lg:ml-0">
                            <button onClick={() => setVisible(false)} type="button" className="mx-2 my-2 bg-white hover transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 rounded border border-gray-800 text-gray-800 px-8 py-3 text-sm">Back</button>
                            <button type="submit" className="mx-2 my-2 bg-black text-white transition duration-150 ease-in-out hover rounded border border-gray-800 px-8 py-3 text-sm">{isEditing ? "Update" : "Save"}</button>
                        </div>
                    </div>
                </form>
            </div>
        </Popup>
    )
}

export default PopupComponent;