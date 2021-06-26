import React, { Component } from "react";
import Note from "./note";
import { NoteProps } from "../../utils/interfaces";
class Wrapper extends Component<NoteProps> {
    // Class component added to accommodate flip animation
    render(){
        let { dispatch, item, index, notes } = this.props;
        return (
            <Note dispatch={dispatch} item={item} index={index} notes={notes}/>
        )
    }
}
export default Wrapper;