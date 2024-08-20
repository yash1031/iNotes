import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Contexts/Notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import RichTextEditor from "./RichTextEditor";
import SortNotes from "../Display Notes/SortNotes";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const navigate= useNavigate();

  useEffect(()=>{
    const token= localStorage.getItem('token');
    if(token){
      console.log(token);
      getNotes();
      
    }
    else{
      navigate('/login');
      toast.warning("Please get Logged In first");
    }
  },[])

  const ref= useRef(null);
  const clearContent= useRef(null);

  const [note, setNote]= useState({id:"", title: "", description: "", tag: "", deadline: null, priority: null, reference: ""});

  const updateNote = (currentNote) =>{
      ref.current.click();
      setNote(currentNote);
  }
  const handleUpdateNote = async (e) =>{
    e.preventDefault();
    editNote(note._id, note.title, note.description, note.tag, note.deadline, note.priority, note.reference);
    toast.success(note.noteType + " updated successfully");
    //Reset Form
    let form=  document.getElementById('form_NotesUpdation')
    await form.reset();

    // Clear the content of the RichTextEditor
    console.log("clearContent.current: "+ JSON.stringify(clearContent));
    clearContent.current();

  }

  const onChange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value});
  }

  let fun1= ()=> {
    let uniqueKey = 0; // name is a local variable created by init
    return () => {
      uniqueKey++;
      return uniqueKey;
    }
  }

  const funToRecieveData = (data) =>{
    if(typeof data === "function") clearContent.current= data;
  }

  let x= fun1();

  return (
    <div style={{paddingTop: "200px"}}>
      <AddNote></AddNote>
      
<button ref={ref} type="button" className="btn d-none" data-toggle="modal" data-target="#exampleModal">
  Launch Update modal 
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content" style={{backgroundColor: "#474f57"}}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update the {note.noteType} Here</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form id="form_NotesUpdation" className="modal-body">
        <div className="mb-3">
          <label htmlFor="titleForUpdateModal" className="form-label">
            Title
          </label>
          <input value={note.title} type="text" className="form-control" id="titleForUpdateModal" name="title" aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Description
          </label>
          <RichTextEditor funToRecieveData={funToRecieveData} note={note} setNote={setNote} scope="updateNote"/>
        
        </div>
        <div className="mb-3">
          <label htmlFor="tagForUpdateModal" className="form-label">
            Tag
          </label>
          <input value={note.tag} type="text" className="form-control" id="tagForUpdateModal" name="tag" onChange={onChange}/>
        </div>
        <div className="mb-3" style={{display: note.deadline!= null ?'block':"none"}}>
          <label htmlFor="deadlineForUpdateModal" className="form-label">
            Deadline
          </label>
          <input value={note.deadline} type="date" className="form-control" id="deadlineForUpdateModal" name="deadline" onChange={onChange}/>
        </div>
        <div className="mb-3" style={{display: note.priority!= null ?'block':"none"}}>
          <label htmlFor="priorityForUpdateModal" className="form-label">
            Priority
          </label>
          <input value={note.priority} type="number" className="form-control" id="priorityForUpdateModal" name="priority" onChange={onChange}/>
        </div>
        <div className="mb-3" style={{display: note.reference!= "" ?'block':"none"}}>
          <label htmlFor="referenceForUpdateModal" className="form-label">
            Reference
          </label>
          <input value={note.reference} type="text" className="form-control" id="referenceForUpdateModal" name="reference" onChange={onChange}/>
        </div>
      </form>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleUpdateNote}>Update Note</button>
      </div>
    </div>
  </div>
</div>
      <div style={{margin:"20px 0"}}>
        <h1 className="my-3" style={{display:"inline"}}>Your Notes</h1>
        <SortNotes/>
      </div>
      <div className="d-flex flex-wrap my-4">
        {notes.length === 0 && <div className="mx-3">No notes to display</div>}
     
        
        {notes.map((note) => {
              console.log(note);
              return (
                <div className="mx-3" >
                  <NoteItem key={x()} updateNote={updateNote} note={note} />
                </div>
              );
        })}
          {/* {notes.forEach((note)=>{
            <div className="col">
                  <NoteItem key={x()} updateNote={updateNote} note={note} />
                </div>
          })} */}
        
      </div>
    </div>
  );
};

export default Notes;
