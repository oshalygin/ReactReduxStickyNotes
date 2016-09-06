import expect from "expect";
import * as stickyNoteActions from "./stickyNoteActions";
import * as actionTypes from "./actionTypes";

import thunk from "redux-thunk";

import configureMockStore from "redux-mock-store";
const middleware = [thunk];
const mockStore = configureMockStore(middleware); //eslint-disable-line no-unused-vars


describe("Sticky Note Actions", () => {

    it("loadNotesSuccess properly returns back an action type of 'LOAD_NOTES_SUCCESS", () => {
        const notes = [
            { text: "Need to pick up the groceries" },
            { text: "Need to pick up the bike from the shop" }
        ];

        const expected = actionTypes.LOAD_NOTES_SUCCESS;
        const actual = stickyNoteActions.loadNotesSuccess(notes).type;
        expect(actual).toEqual(expected);
    });

    it("updateNotesSuccess properly returns back an action type of 'UPDATE_NOTE_SUCCESS", () => {
        const recipe = [
            { type: "Need to pick up the groceries" }
        ];

        const expected = actionTypes.UPDATE_NOTE_SUCCESS;
        const actual = stickyNoteActions.updateNoteSuccess(recipe).type;
        expect(actual).toEqual(expected);
    });

    it("updating a note will properly turn off the editMode by setting it to false", () => {

        const note = {
            type: "Need to pick up the groceries",
            editMode: true
        };

        stickyNoteActions.updateNote(note)(function (updatedNote) {
            expect(updatedNote.note.editMode).toBeFalsy();
        });

    });

    it("editing a note will properly set the editMode of the note entity to true", () => {

        const note = {
            type: "Need to pick up the groceries",
            editMode: false
        };

        stickyNoteActions.editingNote(note)(function (editedNote) {
            expect(editedNote.note.editMode).toBeTruthy();
        });

    });
});