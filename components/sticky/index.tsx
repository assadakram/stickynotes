import React, {useContext, useState} from "react";
import AddNote from "./addNote";
import { Context } from "../../store";
import { Note } from "../../utils/interfaces";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd'
import FlipMove from 'react-flip-move';
import NoteWrapper from './noteWrapper';


const Index = () => {
    const { notes, dispatch}: any = useContext(Context);
    const [condition, setCondition] = useState("all");
    let isMobile = false;
    try{
        isMobile = window.innerWidth < 600;
    } catch (err){

    }
    const check = (star:boolean) => {
        return condition === "all" ? true : star;
    }

    return(
        <div className="mx-auto container py-20 px-6">
            <div className="flex justify-between">
                <AddNote dispatch={dispatch}/>
                <div className="flex">
                    <button className={`py-2 px-10 text-md rounded ${condition === "all" ? "bg-black text-white" : "bg-gray-200" } mr-3`} onClick={() => setCondition("all")}>All</button>
                    <button className={`py-2 px-3 text-md rounded ${condition === "stared" ? "bg-black text-white" : "bg-gray-200" }`} onClick={() => setCondition("stared")}>Only Stared</button>
                </div>
            </div>
            <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                <FlipMove
                    duration={200}
                    staggerDurationBy={50}
                    className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    enterAnimation="elevator" leaveAnimation="elevator"
                >
                        {
                            notes.map((item: Note, index:number) => {
                                return item && check(item.star) && (
                                    <NoteWrapper notes={notes} dispatch={dispatch} index={index} key={item.id} item={item}/>
                                )
                            })
                        }
                </FlipMove>
            </DndProvider>
        </div>
    )
};
export default Index;
