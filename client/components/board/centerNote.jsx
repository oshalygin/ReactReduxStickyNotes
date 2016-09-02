import React, { PropTypes } from "react";

const CenterNote = (note) => {
    const noteStyle = {...note.style };
    return (

        <div>
            <div className="note"
                style={noteStyle}>
                <p>{note.text}</p>
            </div>
        </div>
    );
};

CenterNote.propTypes = {
    note: PropTypes.object.isRequired
};

export default CenterNote;