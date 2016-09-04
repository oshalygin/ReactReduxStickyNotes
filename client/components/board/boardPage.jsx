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
            note: {},
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
        this.onExpand = this.onExpand.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({ notes: newProps.notes });
    }

    componentDidMount() {
        this.setState({ //eslint-disable-line
            notes: this.props.notes,
            centerNote: {
                style: {
                    backgroundColor: "blue",
                    top: "50%",
                    left: "50%",
                    width: "500px",
                    height: "500px"
                }
            }
        });
    }

    addNote(noteText) {
        this.props.stickyNoteActions.createNote({ text: noteText });
    }

    onSave(noteId) {
        let updatedNote = this.props.notes
            .filter(note => note.id === noteId)[0];
        updatedNote.editMode = false;
        this.props.stickyNoteActions.updateNote(Object.assign({}, updatedNote));
    }

    onNoteTextChange(event) {
        const noteId = event.target.name;

        let changedNote = this.props.notes
            .filter(note => note.id === noteId)[0];
        changedNote.text = event.target.value;

        let updatedNotes = [...this.props.notes];
        let existingNoteIndex = updatedNotes.findIndex(note => note.id === noteId);
        updatedNotes.splice(existingNoteIndex, 1, Object.assign({}, changedNote));

        return this.setState({});
    }

    onEdit(noteId) {
        const noteClicked = this.props.notes
            .filter(note => note.id === noteId)[0];
        this.props.stickyNoteActions.editingNote(Object.assign({}, noteClicked));
    }

    onExpand(noteId) {

        //This needs a lot of work....
        event.preventDefault();

        let flippedNote = this.props.notes
            .filter(note => note.id === noteId)[0];
        flippedNote.position.transition = "1.0s";
        flippedNote.position.transformStyle = "preserve-3d";
        flippedNote.position.backgroundColor = "#3498db";
        flippedNote.position.color = "white";
        flippedNote.position.width = "300px";
        flippedNote.position.height = "300px";
        flippedNote.position.position = "absolute";
        flippedNote.position.left = "50%";
        flippedNote.position.top = "50%";


        flippedNote.centered = {
            position: "absolute",
            left: "50%",
            top: "50%"
        };


        // flippedNote.position.transform = "translate(-50%, -50%) rotateY(180deg)";

        this.setState({});
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
                            onExpand={this.onExpand}
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