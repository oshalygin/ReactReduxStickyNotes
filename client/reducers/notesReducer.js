import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";
import uuid from "uuid";

export default function recipeReducer(state = initialState.notes, action) {
    switch (action.type) {
        case actionTypes.LOAD_NOTES_SUCCESS: {
                return action.notes.reduce((notes, note) => {
                    return [
                        ...notes,
                        {...note,
                        id: uuid.v4()} ];
            }, []);
        }
        case actionTypes.CREATE_NOTE_SUCCESS: {
            return [
                ...state, Object.assign({}, action.note)
            ];
        }
        case actionTypes.UPDATE_NOTE_SUCCESS: {
                    let updatedNote = [...state];
                    let existingNoteIndex = updatedNote.findIndex(note => note.id === action.note.id);
                    updatedNote.splice(existingNoteIndex, 1, Object.assign({}, action.note));

                    return [
                        ...updatedNote
                    ];
        }
        default: {
                return state;
        }
    }
}