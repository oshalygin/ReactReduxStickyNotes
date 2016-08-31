import React, { PropTypes } from "react";
import ReactDOM from "react-dom"; //eslint-disable-line no-unused-vars
import Draggable from "react-draggable";

function randomBetween(min, max) {
    return (min + Math.ceil(Math.random() * max));
}

const noteStyle = {
    right: randomBetween(0, window.innerWidth - 150) + "px",
    top: randomBetween(0, window.innerHeight - 150) + "px",
    transform: "rotate(" + randomBetween(-15, 15) + "deg)"
};

export function renderDisplay(noteText, onEdit, onRemove) {
    return (
        <Draggable>
            <div className="note"
                style={noteStyle}>
                <p>{noteText}</p>
                <span>
                    <button onClick={onEdit}
                        className="btn btn-primary glyphicon glyphicon-pencil"/>
                    <button onClick={onRemove}
                        className="btn btn-danger glyphicon glyphicon-trash"/>
                </span>
            </div>
        </Draggable>
    );
}

export function renderForm(noteText, onSave) {
    return (
        <Draggable>
            <div className="note" style={noteStyle}>
                <textarea ref="newText" defaultValue={noteText}
                    className="form-control"></textarea>
                <button onClick={onSave} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
        </Draggable>
    );
}


const Note = ({note, onSave, onEdit, onRemove}) => {
    if (!!note.editMode) {
        return renderForm(note.text, onSave);
    } else { //eslint-disable-line
        return renderDisplay(note.text, onEdit, onRemove);
    }
};

Note.propTypes = {
    note: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default Note;