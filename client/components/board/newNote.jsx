import React, { PropTypes } from "react";

const NewNote = ({createNote}) => {
    return (
        <button className="btn btn-sm btn-success glyphicon glyphicon-list-alt"
            onClick={() => createNote("Enter Note Text") }/>
    );
};

NewNote.propTypes = {
    createNote: PropTypes.func.isRequired
};

export default NewNote;