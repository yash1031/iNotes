import { clear } from '@testing-library/user-event/dist/clear';
import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles


// Register custom fonts
const fonts = ['sans-serif', 'serif', 'monospace']; // Add your custom fonts here
const Font = Quill.import('formats/font');
Font.whitelist = fonts;
Quill.register(Font, true);

const RichTextEditor = (props) => {
  const { note, setNote, funToRecieveData, scope }= props;
  const [content, setContent] = useState('');

  const handleChange = ( value) => {
    setContent(value);
    setNote({...note, 'description': value});
  };

  const clearContent = () => {
    setContent('');
  };

  useEffect(()=>{
    funToRecieveData(clearContent);
  },[]);

  useEffect(()=>{
    funToRecieveData(content);
  },[scope=="addNote"? content: null])

  useEffect(()=>{
    setContent(note.description);
  },[scope==="updateNote"? note.description: null])

  const functionOnFocus = () =>{
    if(scope==="addNote"){
      const {handleOnFocus}= props;
      handleOnFocus();
    }
  }

  return (
    <div>
      <ReactQuill
        onFocus={functionOnFocus}
        id='description'
        value={content}
        onChange={(value)=>handleChange(value)}
        placeholder="Enter an amazing Description..."
        modules={{
          toolbar: [
            [{ font: fonts }], // Default font selection provided by Quill
            [{ header: [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link',],
          ],
        }}
        theme="snow"
        style={{background: "white", color: "black", borderRadius: '10px', minHeight: "200px", maxHeight: "1000px", overflowY: "auto"}} // Snow is the default theme for Quill
      />
    </div>
  );
};

export default RichTextEditor;
