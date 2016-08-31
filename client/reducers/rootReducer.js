import { combineReducers } from "redux";
import notes from "./notesReducer";

const rootReducer = combineReducers({
    notes
});

export default rootReducer;