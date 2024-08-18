const express = require('express');
const router = express.Router();
const fetchuser = require('../middleWare/fetchUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        console.log("Success! Notes fetched are: "+ notes)
        res.status(200).json({msg: notes})
    } catch (error) {
        console.error("Error in fetching all notes: "+ error.message);
        res.status(500).json({msg: error.message});
    }
})
  
// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            console.log("In adding notes API")
            const {noteType, title, description, tag, reference, priority, deadline, creationDate, updationDate } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log("Error in adding note: "+ errors.array());
                return res.status(400).json({ msg: errors.array() });
            }
            const note = new Note({
                user: req.user.id, noteType, title, description, tag, reference, priority, deadline, creationDate, updationDate
            })
            const savedNote = await note.save()
            console.log("Success! Saved note is: "+ savedNote);
            res.status(200).send({msg: savedNote})

        } catch (error) {
            console.error("Error in adding note: "+ JSON.stringify(error.message));
            res.status(500).send({msg: error.message});
        }
    })

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag, deadline, priority, reference, updationDate } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        if (deadline) newNote.deadline= deadline;
        if (priority) newNote.priority= priority;
        if (reference !== "") newNote.reference= reference;
        newNote.updationDate= updationDate;

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send({msg: "Note not Found"}) }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send({msg: "Not Allowed"});
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        console.log("Success! Notes Updated. Updated note is: "+ JSON.stringify(note));
        res.status(200).json({msg: note });
    } catch (error) {
        console.log("Error in notes updation: "+error.message);
        res.status(500).send({msg: error.message});
    }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send({msg: "Not Found"}) }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send({msg: "Not Allowed"});
        }
        // console.log(req.params.id)
        note = await Note.findByIdAndDelete(req.params.id)
        // note = await Note.findByIdAndDelete("66a53e262556659bd45f0f1f")
        console.log("Success in notes deletion for: "+ JSON.stringify(note));
        res.status(200).json({ msg: `Note ${JSON.stringify(note)} has been deleted` });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({msg: error.message});
    }
})
module.exports = router