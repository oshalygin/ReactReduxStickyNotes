import React, { PropTypes } from "react";

const TextArea = ({id, text, onChange}) => {

    return (
        <textarea className="form-control"
            name={id}
            value={text}
            defaultValue={text}
            onChange={onChange}>
        </textarea>
    );
};

TextArea.propTypes = {
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default TextArea;