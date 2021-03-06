'use strict';
import React, { addons, PropTypes } from 'react/addons';

import { Input, Button } from 'react-bootstrap';

let { PureRenderMixin } = addons;

export default React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        onNewComment: PropTypes.func
    },

    getInitialState() {
        return {
            expanded: false
        };
    },

    expand() {
        this.setState({ expanded: true });

        this.refs.text.getDOMNode().focus();
    },

    collapse() {
        let input = this.refs.text.getDOMNode(),
            text = input.value;

        if (!text) {
            this.setState({ expanded: false });
        }
    },

    onSubmit(event) {
        let input = this.refs.text.getDOMNode(),
            text = input.value;

        event.preventDefault();

        if (!text) return;

        this.props.onNewComment(text);
        input.value = '';
        this.collapse();
    },

    render: function() {
        const { onNewComment } = this.props;
        const { expanded } = this.state;
        const style = { overflow: 'hidden' };

        if (!expanded) {
            style.height = '0px';
            style.margin = '0';
        }
        return <form onSubmit={this.onSubmit}>
            {expanded || <input
                ref="fake"
                type="text"
                className="form-control"
                onFocus={this.expand}
                placeholder={iget('Write your comment')}/>}

            <div className="form-group" style={style}>
                <textarea
                    ref="text"
                    onBlur={this.collapse}
                    placeholder={iget('Enter comment text')}
                    className="form-control">
                </textarea>
            </div>

            {expanded && <Button
                type="submit"
                bsSize="small"
                bsStyle="primary">
                {iget('Add comment')}
            </Button>}
        </form>;
    }
});

