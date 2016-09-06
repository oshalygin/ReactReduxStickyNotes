import expect from "expect";
import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";
import * as stickyNoteActions from "../actions/stickyNoteActions";

describe("Store", () => {

    it("should return a list of notes upon load", () => {
        const expected = 1;
        const initialState = {
            notes: [{
                text: "I need to buy Strawberries tonight",
                centered: false,
                editMode: false,
                id: "abcd12345"
            }]
        };
        const store = createStore(rootReducer, initialState);

        const action = stickyNoteActions.loadNotesSuccess(initialState.notes);
        store.dispatch(action);

        const actual = store.getState().notes.length;
        expect(actual).toEqual(expected);

    });
});