import expect from "expect";
import notesReducer from "./notesReducer";
import * as actionTypes from "../actions/actionTypes";

describe("Note Reducer", () => {

    it("note reducer should set the id property to to some uuid", () => {


        const initialState = [];
        const notes = [
            {
                text: "Need to pick up the motorcycle from the shop",
                editMode: false
            },
            {
                text: "Write some code",
                editMode: false
            }];

        const loadNotesAction = {
            type: actionTypes.LOAD_NOTES_SUCCESS,
            notes
        };

        let newNotesState = notesReducer(initialState, loadNotesAction);
        let actual = newNotesState[0].id;
        expect(actual).toNotBe(undefined); //eslint-disable-line no-undefined

    });

    it("note reducer should set the intiial state of editMode to false for every note", () => {

        const initialState = [];
        const notes = [
            {
                text: "Need to pick up the motorcycle from the shop"
            },
            {
                text: "Write some code"
            }];
        const loadNotesAction = {
            type: actionTypes.LOAD_NOTES_SUCCESS,
            notes
        };

        let newNotesState = notesReducer(initialState, loadNotesAction);
        newNotesState.map(note => {
            let actual = note.editMode;
            expect(actual).toBeFalsy();
        });
    });

    it("updating a note properly returns a different(immuatble) note object", () => {

       const initialState = [
           {
               id: "da9207ef-75a8-46c8-a8f0-eda9ad1d708e",
               text: "Need to pick up the motorcycle from the shop",
                editMode: false
            },
            {
                text: "Write some code"
            }];

        const updatedNote = {
            ...initialState[0], editMode: true
        };

        const updateNotesAction = {
            type: actionTypes.EDITING_NOTE_SUCCESS,
            note: updatedNote
        };

        let newNotesState = notesReducer(initialState, updateNotesAction);
        expect(newNotesState).toNotEqual(initialState);

    });

    it("updating the text on a note properly returns the newly saved note with the updated text", () => {

        const expected = "Need to pick up the girlfriend instead of the bike";
         const initialState = [
           {
               id: "da9207ef-75a8-46c8-a8f0-eda9ad1d708e",
               text: "Need to pick up the motorcycle from the shop",
                editMode: false
            },
           {
                id: "da9207ef-75a8-46c8-a8f0-eda9ad1d708d",
               text: "Need to pick up the motorcycle from the shop",
                editMode: false
            }];

        const updatedNote = {
            ...initialState[0], text: "Need to pick up the girlfriend instead of the bike"
        };

        const updatedNoteAction = {
            type: actionTypes.EDITING_NOTE_SUCCESS,
            note: updatedNote
        };

        let newNotesState = notesReducer(initialState, updatedNoteAction);
        let actual = newNotesState[0].text;
        expect(actual).toEqual(expected);

    });
});