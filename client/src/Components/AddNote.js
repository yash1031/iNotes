import React, {useContext, useState, useRef} from 'react'
import noteContext from '../Contexts/Notes/noteContext';
import Notes from './Notes';
import { toast } from 'react-toastify';
import RichTextEditor from './RichTextEditor';

const AddNote = () => {
  const context = useContext(noteContext);
  const { notes, notesKeyword, notesCategory, addNote } = context;
  const [noteType, setNoteType]= useState('General Note');
  const [note, setNote]= useState({noteType: "", title: "", description: "", tag: "", reference: "", priority: "", deadline: ""});
  const clearContent= useRef(null);
  const contentInDes= useRef('');
  const inputElements= ['title', 'description','tag', 'reference', 'priority', 'deadline'];

  const funToRecieveData = (data) =>{
    console.log("Inside funcToData, data is: "+ data);
    if(typeof data === "function")
      clearContent.current= data;
    if(typeof data === "string")
      contentInDes.current= data;
  }

  const handleOnFocus = () =>{
    inputElements.map((elementID)=>{
      document.getElementById(elementID+'Required').style.display= 'none';
    })
  }

  const handleAddNote = async (e) =>{
    e.preventDefault();
    let fieldsAvailable= true;
    inputElements.map((elementID)=>{
      if(document.getElementById(elementID+ "Section").style.display=== 'none') return;
      if(elementID=== 'description'){
        if(contentInDes.current === ''){
          document.getElementById(elementID+'Required').style.display= '';
          fieldsAvailable= false;
        }
      }
      else if( document.getElementById(elementID).value === ''){
        document.getElementById(elementID+'Required').style.display= '';
        fieldsAvailable= false;
      }
    })
    if(fieldsAvailable== false) return;
    console.log("Note to be added is: "+ JSON.stringify(note));
    note.noteType= noteType;
    addNote(note);
    toast.success(note.noteType + " added Successfully");
    setNote({noteType: "", title: "", description: "", tag: "", reference: "", priority: "", deadline: ""});

    //Reset Form
    let form=  document.getElementById('form_NotesAddition')
    await form.reset();

    // Clear the content of the RichTextEditor
    clearContent.current();
  }

  const onChange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value});
  }


  return (
    <div  style={ (notesKeyword.current.length!== 0  && notesKeyword.current.length  !== notes.length )? {display: "none"} : {pdisplay: ""}}>
      <div style={{width:"100%", margin: "20px 0"}}>
        <h1 style={{display:"inline"}}>Add {noteType==="Article"? "an": "a"} {noteType}</h1>
        <div className="dropdown" style={{margin:"20px 0"}}>
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Select Note Type
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{width: "100%"}}>
            <a className="dropdown-item" onClick={(e)=>{e.preventDefault(); setNoteType('Article')}}>Article</a>
            <a className="dropdown-item" onClick={(e)=>{e.preventDefault(); setNoteType('Task')}}   >Task</a>
            <a className="dropdown-item" onClick={(e)=>{e.preventDefault(); setNoteType('General Note')}}>General Note</a>
          </div>
        </div>
        
      </div>
      <form id="form_NotesAddition" style={{width:"100%"}}>
        <div id="titleSection" className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" className="form-control input" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} onFocus={handleOnFocus} placeholder='Enter a title'/>
          <div id="titleRequired" style={{display:"none", color:"Red"}}>
            Required*
          </div>
        </div>
        <div id="descriptionSection" className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          {/* <input type="text" className="form-control input" id="description" value={note.description} name="description" onChange={onChange} placeholder='Enter a description'/> */}
          <RichTextEditor funToRecieveData={funToRecieveData} note={note} setNote={setNote} handleOnFocus={handleOnFocus} scope="addNote"/>
          <div id="descriptionRequired" style={{display:"none", color:"Red"}}>
            Required*
          </div>
        </div>
        <div id="tagSection" className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input type="text" className="form-control input" id="tag" name="tag" value={note.tag} onChange={onChange} onFocus={handleOnFocus} placeholder='Enter a relevant tag'/>
          <div id="tagRequired" style={{display:"none", color:"Red"}}>
            Required*
          </div>
        </div>
        <div id="referenceSection" className="mb-3" style={{display: noteType=='Article'?'block':'none'}}>
          <label htmlFor="reference" className="form-label">
            Reference
          </label>
          <input type="url" className="form-control input" id="reference" name="reference" value={note.reference} onChange={onChange} onFocus={handleOnFocus} placeholder='Enter the article reference'/>
          <div id="referenceRequired" style={{display:"none", color:"Red"}}>
            Required*
          </div>
        </div>
        <div id="prioritySection" className="mb-3" style={{display: noteType=='Task'?'block':'none'}}>
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <input type="number" min="1" max="5" className="form-control input" id="priority" name="priority" value={note.priority} onChange={onChange} onFocus={handleOnFocus} placeholder='Set priority for your task'/>
          <div id="priorityRequired" style={{display:"none", color:"Red"}}>
            Required*
          </div>
        </div>
        <div id="deadlineSection" className="mb-3" style={{display: noteType=='Task'?'block':'none'}}>
          <label htmlFor="deadline" className="form-label">
            Task Deadline
          </label>
          <input type="datetime-local" className="form-control input" id="deadline" name="deadline" value={note.deadline} onChange={onChange} onFocus={handleOnFocus} placeholder='Deadline for task completion'/>
          <div id="deadlineRequired" style={{display:"none", color:"Red"}}>
            Required*
          </div>
        </div>
        
        <button type="submit" className="btn primaryBtn" onClick={handleAddNote} style={{width: "100%", margin: "10px 0"}}>
          Add Your Note
        </button>
      </form>
    </div>
  )
}

export default AddNote
