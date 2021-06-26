import React, {useCallback, useRef, useState} from "react";
import {standardDate} from "../../utils/functions";
import Popup from "./popup";
import { Note } from "../../utils/interfaces";
import update from 'immutability-helper'
import {useDrag, useDrop} from 'react-dnd';
import { NoteProps } from "../../utils/interfaces";
import ConfirmationModel from "./confirmationModel";
import { UPDATE_NOTES_ORDER, UPDATE_NOTE } from "../../store/constants";
import {deleteNote, updateNote} from "../../store/apis";

const NoteCard: React.FC<NoteProps> = ({dispatch, item, index, notes}): JSX.Element =>{
    let date = standardDate(item.date);
    const [ visible, setVisible ]  = useState(false);
    const [ remove, setRemove ]  = useState(false);
    const removeItem = (flag: boolean) => {
        setRemove(flag);
        if(flag){
            deleteNote(dispatch, item.id);
        }
    }

    const ref = useRef(null);

    const addStar = (value: boolean) => {
        updateNote(dispatch, {...item, star: value});
    }

    const [{isDragging}, drag] = useDrag({
        type: "card",
        item: {...item, index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })


    const [, drop] = useDrop(() => ({
        accept: "card",
        drop(single: Note, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = single.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            single.index = hoverIndex;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    }), [notes])

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        const dragCard = notes[dragIndex]
        let array = update(notes, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        })
        dispatch({
            type: UPDATE_NOTES_ORDER,
            payload: array.map((item, index) => ({...item, index: index}))

        })
    }, [notes])


    drag(drop(ref));

    return (
        <div ref={ref} style={{backgroundColor: item.color}} className={`${isDragging ? "opacity-40 cursor-grabbing" : ""} cursor-grab card relative min-h-64 flex flex-col justify-between rounded-lg border py-5 px-4 w-full sm:w-290`}>
            <Popup visible={visible} isEditing={true} formData={item} setVisible={setVisible} dispatch={dispatch}/>
            <ConfirmationModel visible={remove} setVisible={setRemove} title="Confirmation Model" message="Are you sure you want to delete this item?" buttonHandler={removeItem}/>
            <div onClick={() => setRemove(true)} className="opacity-0 cursor-pointer bg-black text-white rounded-full absolute -top-2 -right-2 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="15"
                     height="15" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                     strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </div>
            <div>
                <h4 className="text-gray-800 font-bold mb-3">{item.name}</h4>
                <p className="text-gray-800 text-sm">{item.description}</p>
            </div>
            <div>
                <div className="flex items-center justify-between text-gray-800">
                    <p className="text-sm">{date.monthName} {date.monthNumber}, {date.fullYear}</p>
                    <div className="flex">
                        <div onClick={() => setVisible(true)} className="mr-2 hover w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                            </svg>
                        </div>
                        <div onClick={() => addStar(!item.star)} className={`hover w-8 h-8 rounded-full bg-gray-800 ${item.star ? "text-yellow-400" : "text-white"} flex items-center justify-center`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NoteCard;