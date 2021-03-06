import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";
import uuid from "uuid";

export default function noteReducer(state = initialState.notes, action) {

    function randomBetween(min, max) {
                return (min + Math.ceil(Math.random() * max));
    }

    switch (action.type) {
        case actionTypes.LOAD_NOTES_SUCCESS: {
                return action.notes.reduce((notes, note) => {
                    return [
                        ...notes,
                        {...note,
                        id: uuid.v4(),
                        editMode: false } ];
            }, []);
        }
        case actionTypes.UPDATE_NOTE_SUCCESS: {
            return [...state];
        }
        case actionTypes.CREATE_NOTE_SUCCESS: {

            const createdNote = {
                id: uuid.v4(),
                text: action.note.text,
                editMode: false,
                centered: false,
                position: {
                    right: randomBetween(0, window.innerWidth - 150) + "px",
                    top: randomBetween(0, window.innerHeight - 150) + "px",
                    transform: "rotate(" + randomBetween(-15, 15) + "deg)"
                }
            };
            return [
                ...state, Object.assign({}, createdNote)
            ];
        }
        case actionTypes.DELETE_NOTE_SUCCESS: {

               let listOfNotes = [...state];
                    let existingNoteIndex = listOfNotes.findIndex(note => note.id === action.note.id);
                    listOfNotes.splice(existingNoteIndex, 1);

                    return [
                        ...listOfNotes
                    ];
        }
        case actionTypes.REPOSITIONED_NOTE_SUCCESS:
        case actionTypes.EDITING_NOTE_SUCCESS: {
                    let listOfNotes = [...state];
                    let existingNoteIndex = listOfNotes.findIndex(note => note.id === action.note.id);
                    listOfNotes.splice(existingNoteIndex, 1, Object.assign({}, action.note));

                    return [
                        ...listOfNotes
                    ];
        }
        default: {
                return state;
        }
    }
}