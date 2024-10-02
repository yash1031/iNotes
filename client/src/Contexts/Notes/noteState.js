import React, {
   useState, useRef 
} from "react";
import { toast } from 'react-toastify';
import NoteContext from "./noteContext";

const NoteState= (props)=>{

    const host= process.env.REACT_APP_HOST_NAME;

    const initialNotes= [];

      const [notes, setNotes]= useState(initialNotes);
      const notesKeyword= useRef([]);
      const notesCategory= useRef([]);

      const addNote = async ({noteType, title, description, tag, reference, deadline, priority })=>{
        try{
          const response = await fetch(`${host}/api/notes/addnote`, {
              method: "POST", 
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
              },
              body: JSON.stringify({noteType, title, description, tag, reference, deadline, priority, creationDate: new Date(), updationDate: new Date()}), // body data type must match "Content-Type" header
          });
          const json= await response.json();
          const newNotes= json.msg;
          if(response.status === 200){
            // console.log("Success! Saved note is: "+ JSON.stringify(json.msg))
            if(notesCategory.length!==0){
              notesKeyword.current= [];
              notesCategory.current= [];
              getNotes();
            }
            else
              setNotes(notes.concat(newNotes));
          }
          else{
            // console.log("Failure! Error in adding note: "+ json.msg)
            toast.warning(JSON.stringify(newNotes.errors[0].msg).replace(/^["'](.*)["']$/, '$1'));
          }
        }catch(error){
          // console.log("Failure! Error in adding note: "+ error.message);

        }
      }

      const getNotes = async ()=>{
            try{
                const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                  method: "GET", 
                  headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                  }
                });
                const json= await response.json();
                if(response.status === 200){
                  // console.log("Inside getNotes, Updated notes are: "+ JSON.stringify(json.msg));
                  setNotes(json.msg);
                }else{
                  // console.log("Error in fetching notes: "+ json.msg);
                }
            }catch(error){
                // console.log("Error in fetching notes: "+ error.message)
            }
      }

      const deleteNote = async (id)=>{
            try{
              const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem('token')
                }});
              const json= await response.json();    
              if(response.status === 200){
                // console.log("Success! "+ json.msg);
                const newNotes= notes.filter((note)=>{return note._id!= id});
                setNotes(newNotes);
                if(notesKeyword.length !== 0){
                  const newNotesKeyword= notesKeyword.filter((note)=>{return note._id!= id});
                  notesKeyword.current= newNotesKeyword;
                }
                if(notesCategory.length !== 0){
                  const newNotesCategory= notesCategory.filter((note)=>{return note._id!= id});
                  notesCategory.current= newNotesCategory;
                } 
              }else{
                // console.log("Failure! In Notes deletion "+ json.msg)
              }
            }catch(error){
              // console.log("Failure in notes Deletion: "+ error.message);
            }
      } 

      const editNote = async (id, title, description, tag, deadline, priority, reference)=>{
        try{
          const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag, deadline, priority, reference, updationDate: Date()}),
          });
          const json= await response.json();
          if(response.status=== 200){
            // console.log("Success! In Notes updation. Updated note is: "+ JSON.stringify(json.msg))
            const newNotes= JSON.parse(JSON.stringify(notes));
            for(let index=0; index< newNotes.length; index++){
              const element= newNotes[index];
              if(element._id == id){
                newNotes[index].title= title;
                newNotes[index].description= description;
                newNotes[index].tag= tag;
                newNotes[index].deadline= deadline;
                newNotes[index].priority= priority;
                newNotes[index].reference= reference;
                break;
              }
            }
            setNotes(newNotes);
            const newNotes1= JSON.parse(JSON.stringify(notesKeyword.current));
            for(let index=0; index< newNotes1.length; index++){
              const element= newNotes1[index];
              if(element._id == id){
                newNotes1[index].title= title;
                newNotes1[index].description= description;
                newNotes1[index].tag= tag;
                newNotes1[index].deadline= deadline;
                newNotes1[index].priority= priority;
                newNotes1[index].reference= reference;
                break;
              }
            }
            notesKeyword.current= newNotes1;
            const newNotes2= JSON.parse(JSON.stringify(notesCategory.current));
            for(let index=0; index< newNotes2.length; index++){
              const element= newNotes2[index];
              if(element._id == id){
                newNotes2[index].title= title;
                newNotes2[index].description= description;
                newNotes2[index].tag= tag;
                newNotes2[index].deadline= deadline;
                newNotes2[index].priority= priority;
                newNotes2[index].reference= reference;
                break;
              }
            }
            notesCategory.current= newNotes2;
          }
          else{
            // console.log("Failure! Error in Notes deletion: "+ json.msg)
          }
        } catch(error){
          // console.log("Failure! Error in Notes deletion: "+ error.message);
        }
      }
      
      return (
        <NoteContext.Provider value={{notes, setNotes, addNote, getNotes, deleteNote, editNote, notesKeyword, notesCategory}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;