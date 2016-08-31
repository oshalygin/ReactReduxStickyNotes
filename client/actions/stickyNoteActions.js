import * as actionTypes from "./actionTypes";
import axios from "axios";

export function loadNotesSuccess(notes) {
    return {
        type: actionTypes.LOAD_NOTES_SUCCESS,
        notes
    };
}

export function createdNoteSuccess(note) {
    return {
        type: actionTypes.CREATE_COURSE_SUCCESS,
        note
    };
}

export function updateNoteSuccess(note) {
    return {
        type: actionTypes.UPDATE_NOTE_SUCCESS,
        note
    };
}

export function loadNotes() {
    return function (dispatch) {
        return axios.get("/api/notes") //Future implementation
            .then(notes => {
                dispatch(loadNotesSuccess(notes.data));
            })
            .catch(error => {
                throw (error);
            });
    };
}

export function updateNote(note) {
    return function (dispatch) {
        const updatedNote = Object.assign({}, note);
        dispatch(updateNoteSuccess(updatedNote));
    };
}

export function createNote(note) {
    return function (dispatch) {
        const createdNote = Object.assign({}, note);
        dispatch(createdNote(note));
    };
}


