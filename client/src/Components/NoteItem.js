import React, { useContext, useRef } from "react";
import noteContext from "../Contexts/Notes/noteContext";
import { toast } from 'react-toastify';
import { useState } from "react";
import './NoteItem.css'

const NoteItem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const [itemToDel, setItemToDel]= useState(note);
  // const ref= useRef(null);
  const handleClick = (note) => {
    console.log("Note ID is: " + note._id);
    console.log("Note is: "+ JSON.stringify(note));
    deleteNote(note._id);
    toast.success(note.noteType + " deleted successfully");
  };
  const formatTimestamp = (val) => {
    const timeStamp = new Date(val);
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Kolkata'   };
    // console.log("Date before format: "+ val+ " Date after format: "+ timeStamp.toLocaleDateString('en-GB', options));
    return timeStamp.toLocaleDateString('en-GB', options);
  };
  // const formattedTimestamp = formatTimestamp(timeStamp);

  return (
    <div>
      {/* <button ref={ref} type="button" className="btn d-none" data-toggle="modal" data-target="#sureToDelete">
        Launch Update modal 
      </button> */}
      <div className="modal fade" id="sureToDelete" tabIndex="-1" role="dialog" aria-labelledby="sureToDeleteLabel" aria-hidden="true" >
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{backgroundColor: "#474f57"}}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Note Deletion for {note.title}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" >&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure of note deletion? Pls Confirm.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=> {console.log("Note to be deleted is: "+ JSON.stringify(note))}}>
                Delete Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="notesCard" className="card my-3">
        <div className="card-body">
          <div className="continer" style={{margin: "10px 0"}}>
            <h5 className="card-title" style={{display:"inline"}}>{note.title}</h5>
            <h8 style={{display: note.priority?'inline':'none', float: 'right'}}>{note.priority === 1 ? "Not Important": note.priority===2? "Less Important": note.priority===3?"Medium Importance": note.priority===4?"Important Task": "Top Priority"}</h8>
          </div>
          <p className="card-text" dangerouslySetInnerHTML={{ __html: note.description }}/>
          <p className="card-text">{note.tag}</p>
            <i className="fa-solid fa-trash mx-2" onClick={()=> handleClick(note)} />
            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => updateNote(note)}/>
          <a href={note.reference?note.reference:'#'} target="_blank" className="btn primaryBtn" style={{display: note.reference? 'block': 'none',width: "100%", margin:"20px auto"}}>
            Read Article
          </a>
          <p style={{display: note.deadline?'block': 'none'}}>{`To be Completed By ${formatTimestamp(note.deadline)}`}</p>
          <div style={{display: "block", margin: "10px"}}>
            <span style={{float:'left', width: "50%"}}>Creation Time {formatTimestamp(note.creationDate)}</span>
            <span style={{float:'right', width: "40%"}}>Last Updated {formatTimestamp(note.updationDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
