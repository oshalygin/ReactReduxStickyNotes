import React, { PropTypes } from "react";

const TextArea = ({id, text, onChange}) => {

    return (
        <textarea className="form-control"
            name={id}
            value={text}
            onChange={onChange}>
        </textarea>
    );
};

TextArea.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default TextArea;