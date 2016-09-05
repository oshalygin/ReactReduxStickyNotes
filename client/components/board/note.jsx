import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as stickyNoteActions from "../../actions/stickyNoteActions.js";
import ReactDOM from "react-dom"; //eslint-disable-line no-unused-vars
import Draggable from "react-draggable";
import TextArea from "../common/textArea.jsx";


class Note extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            notes: props.notes,
            note: props.note,
            onSave: props.onSave,
            onEdit: props.onEdit,
            onChange: props.onChange,
            onRemove: props.onRemove,
            onExpand: props.onExpand
        };
        this.moveToCenter = this.moveToCenter.bind(this);
        this.onNoteTextChange = this.onNoteTextChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    componentDidUpdate() {

    }

    componentWillReceiveProps(newProps) {
        this.setState({ note: newProps.note });
    }

    onNoteTextChange(event) {
        let {note} = this.props;
        note.text = event.target.value;
        return this.setState({});
    }

    onEdit() {
        console.log("onEdit");
        const {note} = this.props;
        this.props.stickyNoteActions.editingNote(Object.assign({}, note));
    }

    getPosition() {
        console.log(ReactDOM.findDOMNode(this).firstChild.getBoundingClientRect());
    }

    moveToCenter(noteId) {
        const position = ReactDOM.findDOMNode(this).firstChild.getBoundingClientRect();
        console.log(position);
        this.props.onExpand(noteId, position);
        this.setState({});
    }

    render() {

        function setTextDirection(condition) {
            return condition ? { transform: "rotateY(-180deg)" } : {};
        }

        function renderDisplay(note, onEdit, onRemove, moveToCenter) {
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
                                <button onClick={onEdit} disabled={note.centered}
                                    className="btn btn-primary glyphicon glyphicon-pencil"/>
                                <button onClick={onRemove} disabled={note.centered}
                                    className="btn btn-danger glyphicon glyphicon-trash"/>
                            </span>
                        </div>
                    </div>
                </Draggable>
            );
        }

        function renderForm(note, onSave, onChange) {
            return (
                <Draggable>
                    <div className="note-container">
                        <div className="note"
                            style={Object.assign({}, note.position) }>
                            <TextArea
                                id={note.id}
                                text={note.text}
                                onChange={onChange} />
                            <button onClick={() => onSave(note.id) } className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
                        </div>
                    </div>
                </Draggable>
            );
        }

        const {note, onSave, onRemove} = this.state;
        if (!!note.editMode) {
            return renderForm(note, onSave, this.onNoteTextChange);
        } else { //eslint-disable-line
            return renderDisplay(note, this.onEdit, onRemove, this.moveToCenter);
        }
    }
}

Note.propTypes = {
    note: PropTypes.object.isRequired,
    notes: PropTypes.array.isRequired,
    onSave: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Note);