// import mongoose from 'mongoose';

const mongoose = require('mongoose');
const { Schema } = mongoose;
const User= require('./User.js');

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    noteType: {
        type: String,
        default: "General Note"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    reference: {
        type: String,
    },
    deadline: {
        type: Date,
    },
    priority: {
        type: Number,
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    updationDate: {
        type: Date,
        default: Date.now
    },
});

const Note= mongoose.model('notes', NotesSchema); // Creating Model from schema and exporting it, arguments are (collectionName in DB , Schema name )
module.exports = Note;