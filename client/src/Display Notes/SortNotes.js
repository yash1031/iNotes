import React from 'react'
import {useState, useContext} from 'react'
import noteContext from '../Contexts/Notes/noteContext';
import { useLocation } from 'react-router-dom';

const SortNotes = () => {
  const {notes, setNotes}= useContext(noteContext);
  const location= useLocation();
  const sortNotes= async (key) =>{

    // console.log("key: "+ key);

    let newNotes = JSON.parse(JSON.stringify(notes)); // Deep clone the notes array

    newNotes.sort((a, b) => {
        if (a[key] === undefined && b[key] === undefined) {
            return 0; // Both don't have the 'key', keep order unchanged
        }
        if (a[key] === undefined) {
            return 1; // a doesn't have 'key', move it after b
        }
        if (b[key] === undefined) {
            return -1; // b doesn't have 'key', move it after a
        }

        // Sorting logic depending on the key type
        if (typeof a[key] === 'string' && typeof b[key] === 'string') {
            console.log("Inside If");
            return a[key].localeCompare(b[key]);
        } else {
            console.log("Inside Else");
            if(key=='priority') return a[key] - b[key];
            return Date(a[key]) - Date(b[key]); // This works for numbers or dates
        }
    });

    // console.log("Sorted notes are: "+ JSON.stringify(newNotes));
    setNotes(newNotes); // Update the state with the sorted array
      
  }

  return (
    <div>
      <span className="dropdown" style={{position: 'absolute', right:"15vw", top: "10px", height:"100%", width:"5vw", display: location.pathname.includes("/Home")? "": "none"}}>
          <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sort Notes By
          </button>
          <span className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{width: "100%"}}>
            <a className="dropdown-item" onClick={()=>sortNotes('title')}>Title</a>
            <a className="dropdown-item" onClick={()=>sortNotes('tag')}>Tag</a>
            <a className="dropdown-item" onClick={()=>sortNotes('priority')}>Priority</a>
            <a className="dropdown-item" onClick={()=>sortNotes('deadline')}>Deadline</a>
            <a className="dropdown-item" onClick={()=>sortNotes('creationDate')}>Creation Date</a>
            <a className="dropdown-item" onClick={()=>sortNotes('updationDate')}>Updation Date</a>
          </span>
        </span>
    </div>
  )
}

export default SortNotes
