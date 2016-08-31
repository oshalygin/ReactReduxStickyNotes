import React, { PropTypes } from "react";
import ReactDOM from "react-dom"; //eslint-disable-line no-unused-vars
import Draggable from "react-draggable";
import TextArea from "../common/textArea.jsx";

function randomBetween(min, max) {
    return (min + Math.ceil(Math.random() * max));
}

const noteStyle = {
    right: randomBetween(0, window.innerWidth - 150) + "px",
    top: randomBetween(0, window.innerHeight - 150) + "px",
    transform: "rotate(" + randomBetween(-15, 15) + "deg)"
};

export function renderDisplay(note, onEdit, onRemove) {
    return (
        <Draggable>
            <div className="note"
                style={noteStyle}>
                <p>{note.text}</p>
                <span>
                    <button onClick={() => onEdit(note.id) }
                        className="btn btn-primary glyphicon glyphicon-pencil"/>
                    <button onClick={onRemove}
                        className="btn btn-danger glyphicon glyphicon-trash"/>
                </span>
            </div>
        </Draggable>
    );
}

export function renderForm(note, onSave, onChange) {
    return (
        <Draggable>
            <div className="note" style={noteStyle}>
                <TextArea
                    name={note.id}
                    text={note.text}
                    onChange={onChange} />
                <button onClick={() => onSave() } className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
        </Draggable>
    );
}


const Note = ({note, onSave, onEdit, onRemove, onChange}) => {
    if (!!note.editMode) {
        return renderForm(note, onSave, onChange);
    } else { //eslint-disable-line
        return renderDisplay(note, onEdit, onRemove);
    }
};

Note.propTypes = {
    note: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default Note;