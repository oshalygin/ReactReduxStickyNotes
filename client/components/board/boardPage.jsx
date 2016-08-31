import React, { PropTypes } from "react";
import { connect } from "react-redux";
import uuid from "uuid";

import { bindActionCreators } from "redux";
import * as stickyNoteActions from "../../actions/stickyNoteActions.js";

import NewNote from "./newNote.jsx";
import Note from "./note.jsx";

export class BoardPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            notes: [{
                id: uuid.v4(),
                text: "Your First Sticky!!",
                editMode: false
            }]
        };

        this.addNote = this.addNote.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onNoteTextChange = this.onNoteTextChange.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({ notes: newProps.notes });
    }

    componentDidMount() {
        this.setState({ //eslint-disable-line
            notes: this.props.notes
        });
    }

    addNote(noteText) {
        this.props.stickyNoteActions.createNote({ text: noteText });
    }

    onSave() {
        console.log("onSave");
    }

    onNoteTextChange(event) {
        const noteId = event.target.name;

        let noteChanged = this.state.notes
            .filter(note => note.id === noteId)[0];
        noteChanged.text = event.target.value;

        let updatedNote = [...this.state.notes];
        let existingNoteIndex = updatedNote.findIndex(note => note.id === noteId);
        updatedNote.splice(existingNoteIndex, 1, Object.assign({}, noteChanged));

        return this.setState({ notes: [...updatedNote] });
    }

    onEdit(noteId) {
        const noteClicked = this.props.notes
            .filter(note => note.id === noteId)[0];
        this.props.stickyNoteActions.editingNote(Object.assign({}, noteClicked));
    }

    onRemove() {
        console.log("onRemove");
    }

    render() {
        const {notes} = this.state;
        return (
            <div className="board">
                <NewNote createNote={this.addNote} />
                {notes.map(note => {
                    return (
                        <Note
                            key = {note.id}
                            note = {note}
                            onSave={this.onSave}
                            onEdit={this.onEdit}
                            onChange={this.onNoteTextChange}
                            onRemove={this.onRemove}
                            />
                    );
                }) }

            </div>
        );
    }
}

BoardPage.propTypes = {
    notes: PropTypes.array.isRequired,
    stickyNoteActions: PropTypes.object.isRequired
};



function mapStateToProps(state) {
    return {
        notes: state.notes
    };
}

function mapDispatchToProps(dispatch) {
    return {
        stickyNoteActions: bindActionCreators(stickyNoteActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);