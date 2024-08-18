import React from 'react'
import { useState, useContext, useRef } from 'react';
import noteContext from '../Contexts/Notes/noteContext';

const FilterNotes =  () => {
  const [filterField, setFilterField]= useState('All Notes');
  const [noteType, setNoteType]= useState('All Notes');
  const {notes, setNotes, notesKeyword, notesCategory}=  useContext(noteContext);
//   console.log("notesCopy initially are: "+ JSON.stringify(notesCopy.current));

  const filterByKeyword = (e) =>{
        e.preventDefault(); 
        if(notesKeyword.current.length === 0) notesKeyword.current= JSON.parse(JSON.stringify(notes));
        if(notesCategory.current.length!== 0) notesCategory.current= [];

        const newNotes= notesKeyword.current.filter((note)=>{
            console.log("Input field is: " + e.target.value);
            if(filterField === 'All Notes') return note['title'].includes(e.target.value) || note['description'].includes(e.target.value) || note['tag'].includes(e.target.value);
            if(filterField === 'creationDate'){
                const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Kolkata'   };
                const options1 = { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata'   };

                // Create a Date object
                const utcDateAvailable = new Date(note[filterField]);
                // Convert to IST using toLocaleString()
                const istDateAvailable = utcDateAvailable.toLocaleString("en-GB", options);
                
                const dateSearched= new Date(e.target.value);
                const dateSearchedFormatted = dateSearched.toLocaleString("en-GB", options1);

                console.log("note[filterField] in search: "+ istDateAvailable + "dateSearched in search: "+ dateSearchedFormatted);
                return istDateAvailable.includes(dateSearchedFormatted);
            }
            return (note[filterField]).includes(e.target.value);
        });
        // console.log("New Notes are: "+ JSON.stringify(newNotes));
        setNotes(newNotes);
  }

  const filterByCategory = (e, val) =>{
    e.preventDefault(); 
    console.log("Inside filterNotesAs. Val: "+ val);    
    // console.log("notescopy is: "+ JSON.stringify(notesCopy));
    if(notesCategory.current.length === 0) notesCategory.current= JSON.parse(JSON.stringify(notes));
    if(notesKeyword.current.length === 0) notesKeyword.current= JSON.parse(JSON.stringify(notes));

    console.log("notesCategory is: "+ JSON.stringify(notesCategory));
    if(val=== 'All Notes'){
        setNotes(notesCategory.current);
        return ;
    }
    const newNotes= notesCategory.current.filter((note)=>{
        console.log("Value to be filter is: " + val);
        if(val==='Article') return note.reference != "";
        if(val==='Task') return note.priority != null;
        return note.reference=== "";
    });
    setNotes(newNotes);
  }

  return (
    <>
    <span style={{position: 'absolute', left:"20vw", height:"100%"}}>
      <span className="dropdown" style={{height:"100%"}}>
          <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Search In
          </button>
          <span className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{width: "100%"}}>
            <a className="dropdown-item" onClick={(e)=>{e.preventDefault(); setFilterField('title')}}>Title</a>
            <a className="dropdown-item" onClick={(e)=>{e.preventDefault(); setFilterField('description')}}   >Description</a>
            <a className="dropdown-item" onClick={(e)=>{e.preventDefault(); setFilterField('tag')}}>Tag</a>
            <a className="dropdown-item" onClick={(e)=>{e.preventDefault(); setFilterField('priority')}}>Priority</a>
            <a className="dropdown-item" onClick={(e)=>{e.preventDefault(); setFilterField('creationDate')}}>Creation Date</a>
            <a className="dropdown-item" onClick={(e)=>{e.preventDefault(); setFilterField('All Notes')}}>All Notes</a>
          </span>
        </span>
        <input onChange={(e)=> filterByKeyword(e)}
               type={filterField==='priority'?"number": filterField=== 'creationDate'?"date": "text"} 
               style={{display: "inline", padding:'0 10px', margin:"10px 10px", border:"none", height:'70%', borderRadius: "5px", width:'35vw'}} 
               placeholder={filterField=== 'description'? `Enter a keyword or phrase from description`: filterField=== 'All Notes'? 'Search across your notes': `Enter a ${filterField}`} />
    </span>
        <span className="dropdown" style={{position: 'absolute', right:"28vw", top: "10px", height:"100%", width:"5vw"}}>
          <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {noteType}
          </button>
          <span className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{width: "100%"}}>
            <a className="dropdown-item" onClick={(e)=>filterByCategory(e, 'Article')}>Articles</a>
            <a className="dropdown-item" onClick={(e)=>filterByCategory(e, 'Task')}>Tasks</a>
            <a className="dropdown-item" onClick={(e)=>filterByCategory(e, 'General Note')}>General Notes</a>
            <a className="dropdown-item" onClick={(e)=>filterByCategory(e, 'All Notes')}>All Notes</a>
          </span>
        </span>
   </>

  )
}

export default FilterNotes