import React, { PropTypes } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import * as stickyNoteActions from "../../actions/stickyNoteActions.js";


export class BoardPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            notes: []
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({ notes: newProps.notes });
    }

    componentDidMount() {
        this.setState({ //eslint-disable-line
            recipes: this.props.notes
        });
    }

    componentDidUpdate() {
    }

    addNote(noteText) {
        const { notes } = this.state;

        // notes.push({
        //     id: this.nextId(),
        //     note: noteText
        // });
        this.setState({ notes: notes });
    }

    render() {
        return (
            <div className="board">
                <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
                    onClick={this.add.bind(null, "New Note") }/>
            </div>
        );
    }
}

BoardPage.propTypes = {
    notes: PropTypes.array.isRequired
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