import React, { PropTypes } from "react";
import ReactDOM from "react-dom"; //eslint-disable-line no-unused-vars
import Draggable from "react-draggable";
import TextArea from "../common/textArea.jsx";

export function setTextDirection(condition) {
    return condition ? { transform: "rotateY(-180deg)" } : {};
}

export function renderDisplay(note, onEdit, onRemove, moveToCenter) {
    const textDirection = setTextDirection(note.centered);
    return (
        <Draggable>
            <div className="note-container">
                <div className="note"
                    style={Object.assign({}, note.position) }>
                    <p style={textDirection}>{note.text}</p>
                    <span>
                        <button onClick={() => moveToCenter(note.id) }
                            className="btn btn-warning glyphicon glyphicon-resize-full"/>
                        <button onClick={() => onEdit(note.id) }
                            className="btn btn-primary glyphicon glyphicon-pencil"/>
                        <button onClick={onRemove}
                            className="btn btn-danger glyphicon glyphicon-trash"/>
                    </span>
                </div>
            </div>
        </Draggable>
    );
}

export function renderForm(note, onSave, onChange) {
    return (
        <Draggable>
            <div className="note" style={note.position}>
                <TextArea
                    id={note.id}
                    text={note.text}
                    onChange={onChange} />
                <button onClick={() => onSave(note.id) } className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
        </Draggable>
    );
}


class Note extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            note: props.note,
            onSave: props.onSave,
            onEdit: props.onEdit,
            onChange: props.onChange,
            onRemove: props.onRemove,
            onExpand: props.onExpand
        };
        this.moveToCenter = this.moveToCenter.bind(this);
        // this.onNoteTextChange = this.onNoteTextChange.bind(this);
    }

    componentDidUpdate() {

    }

    onNoteTextChange(event) {
        // console.log("onNoteTextChange");
        // const noteId = event.target.name;

        // let changedNote = this.props.notes
        //     .filter(note => note.id === noteId)[0];
        // changedNote.text = event.target.value;

        // let updatedNotes = [...this.props.notes];
        // let existingNoteIndex = updatedNotes.findIndex(note => note.id === noteId);
        // updatedNotes.splice(existingNoteIndex, 1, Object.assign({}, changedNote));

        // return this.setState({});
    }

    moveToCenter(noteId) {
        const position = ReactDOM.findDOMNode(this).firstChild.getBoundingClientRect();
        this.props.onExpand(noteId, position);
    }

    render() {

        const {note, onSave, onChange, onEdit, onRemove} = this.state;
        if (!!note.editMode) {
            return renderForm(note, onSave, onChange);
        } else { //eslint-disable-line
            return renderDisplay(note, onEdit, onRemove, this.moveToCenter);
        }
    }
}

Note.propTypes = {
    note: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired
};

export default Note;