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
        componentHandler.upgradeDom(); //eslint-disable-line
        this.setState({ //eslint-disable-line
            recipes: this.props.notes
        });
    }

    componentDidUpdate() {
        componentHandler.upgradeDom(); //eslint-disable-line
    }

    render() {
        return (
            <div className="content-grid mdl-grid">
                <div className="mdl-layout-spacer"></div>
                <div className="mdl-cell mdl-cell--6-col">
                    <div className="mdl-typography--text-center">
                    <p>Sticky Note Application</p>
                    </div>
                </div>
                <div className="mdl-layout-spacer"></div>
            </div>
        );
    }
}

BoardPage.propTypes = {
    notes: PropTypes.array.isRequired
};



function mapStateToProps(state) {
    return {
        notes: state.notes,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        stickyNoteActions: bindActionCreators(stickyNoteActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);