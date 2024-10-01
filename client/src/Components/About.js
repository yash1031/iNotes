import React, { useEffect } from 'react'
import './About.css'

const About = () => {
    useEffect(()=>{
      localStorage.setItem('currentEndpoint', 'about');
    },[])
  return (
    <div className="about-container">
        <section className="about-content">
            <h2>What is iNotes App?</h2>
            <p>A simple and intuitive application designed to help you store, manage, and organize your notes. Whether it's a quick thought, an important reminder, or a detailed project plan, My Notes App has you covered.</p>
        </section>
        
        <section className="about-features">
            <h2>Features</h2>
            <ul>
                <li><strong>Create Notes:</strong> Quickly jot down notes with a title, description, and tags.</li>
                <li><strong>Edit & Update:</strong> Easily update your notes as your thoughts evolve.</li>
                <li><strong>Delete Notes:</strong> Remove notes that you no longer need.</li>
                <li><strong>Tagging System:</strong> Organize your notes with tags for easy retrieval.</li>
            </ul>
        </section>
        
        <section className="about-usage">
            <h2>How to Use</h2>
            <p>Using iNotebook App is straightforward:</p>
            <ol>
                <li>Click the "New Note" button to create a new note.</li>
                <li>Enter the title, description, and any relevant tags.</li>
                <li>Save the note. You can view all your notes on the main dashboard.</li>
                <li>To edit or delete a note, simply click on the note in the list.</li>
            </ol>
        </section>

        <footer className="about-footer">
            <p>Developed by Yash. &copy; 2024 iNotebook App. All rights reserved.</p>
        </footer>
    </div>
  )
}

export default About
