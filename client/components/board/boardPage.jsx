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
        this.getCoordinateTarget = this.getCoordinateTarget.bind(this);
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
        console.log("saved");
        let updatedNote = this.props.notes
            .filter(note => note.id === noteId)[0];
        updatedNote.editMode = false;
        this.props.stickyNoteActions.updateNote(Object.assign({}, updatedNote));
    }

    onNoteTextChange(event) {
        console.log("onNoteTextChange");
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

    getCoordinateTarget(target, offset, currentNotePosition) {

        const xDifference = target.left - currentNotePosition.left;
        const yDifference = target.top - currentNotePosition.top;
        const xTarget = xDifference > 0 ? xDifference - offset.x : -Math.abs(xDifference) - offset.x;
        const yTarget = yDifference > 0 ? yDifference - offset.y : -Math.abs(yDifference) - offset.y;
        // const xTarget = target.left - currentNotePosition.left - offset.x;
        // const yTarget = target.top - currentNotePosition.top - offset.y;

        return {
            y: yTarget,
            x: xTarget
        };
    }

    onExpand(noteId, currentNotePosition) {

        event.preventDefault();
        let note = this.props.notes
            .filter(specificNote => specificNote.id === noteId)[0];

        const centerOfWindow = {
            left: window.innerWidth / 2,
            top: window.innerHeight / 2
        };

        if (!note.centered) {
            note.position.transition = "all 1s";
            note.position.transformStyle = "preserve-3d";
            note.position.backgroundColor = "#3498db";
            note.position.color = "white";
            note.position.width = "300px";
            note.position.height = "300px";
            note.position.position = "relative";
            const offset = {
                x: 150,
                y: 150
            };
            const translatedCoordinates = this.getCoordinateTarget(centerOfWindow, offset, currentNotePosition);
            note.position.transform = `translate(${translatedCoordinates.x}px, ${translatedCoordinates.y}px) rotateY(180deg)`;

            note.originalPosition = {
                left: currentNotePosition.left,
                top: currentNotePosition.top,
                movement: translatedCoordinates
            };
            console.log(currentNotePosition);

            note.centered = true;
        } else {

            note.position.transition = "all 1s";
            note.position.transformStyle = "preserve-3d";
            note.position.backgroundColor = "yellow";
            note.position.color = "black";
            note.position.width = "150px";
            note.position.height = "150px";
            note.position.position = "relative";
            const offset = {
                x: 150,
                y: 150
            };

            const translatedCoordinates = this.getCoordinateTarget(note.originalPosition, offset, currentNotePosition);

            console.log("movement:", translatedCoordinates);
            note.position.transform = `translate(${translatedCoordinates.x}px, ${translatedCoordinates.y}px)`;
            note.centered = false;
        }

        this.setState({});

    }

    onRemove() {
        console.log("onRemove");
    }

    render() {
        const {notes} = this.state;
        return (
            <div>
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