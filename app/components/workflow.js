"use strict";

import { PropTypes, createClass } from 'react/addons';
import ImMixin from 'react-immutable-render-mixin';
import { $Models } from '../lib/types';
import { List } from 'immutable';
import { findPlugin } from '../lib/helpers';
import { changeWorkflow, addStep } from '../actions/plan.actions';

import Fa from './fa';
import Step from './workflow-step';
import PluginSelect from './plugin-select';
import { Col, Row, Alert } from 'react-bootstrap';

export default createClass({
    mixins: [ImMixin],

    propTypes: {
        $steps: PropTypes.instanceOf(List).isRequired,
        $plugins: $Models
    },

    getInitialState() {
        return { selectedPlugin: false };
    },

    onStepChange(position, $step) {
        let { $steps } = this.props;

        $steps = $steps.set(position, $step);

        changeWorkflow($steps);
    },

    onAddStep() {
        let pluginId = this.refs.plugins.getValue();

        this.setState({ selectedPlugin: false });

        addStep(pluginId);
    },

    onRemove(position) {
        changeWorkflow(this.props.$steps.remove(position));
    },

    onPluginSelect(pluginId) {
        this.setState({ selectedPlugin: pluginId });
    },

    render() {
        let { $steps } = this.props;

        return <div>
            <ul className="list-group">
                {$steps.toArray().map(this.renderStep)}

                <li className="list-group-item">
                    {this.renderAdd()}
                </li>
            </ul>
        </div>
    },

    renderStep($step, i) {
        let { $plugins } = this.props,
            handler = this.onStepChange.bind(this, i),
            onRemove = this.onRemove.bind(this, i);


        return <li className="list-group-item" key={i}>
            <Step $step={$step}
                  $plugins={$plugins}
                  onChange={handler}
                  onRemove={onRemove}/>
        </li>
    },

    renderAdd() {
        let { $plugins } = this.props,
            { selectedPlugin } = this.state,
            $plugin = findPlugin($plugins, selectedPlugin);

        return <Row>
            <Col xs={12} sm={6} md={8}>
                <PluginSelect ref="plugins"
                              $plugins={$plugins}
                              selectedName={selectedPlugin}
                              onSelect={this.onPluginSelect}/>
            </Col>
            <Col xs={12} sm={6} md={4}>
                <button onClick={this.onAddStep}
                        disabled={!selectedPlugin}
                        type="button"
                        className="btn btn-outline btn-primary btn-block">
                    <Fa icon="plus"/>
                    &nbsp;
                    {iget('Add step')}
                </button>
            </Col>
            <Col xs={12}>
                {$plugin && this.renderPluginInfo($plugin)}
            </Col>
        </Row>
    },

    renderPluginInfo($plugin) {
        let { info, title, url } = $plugin.get('desc').toObject(),
            style = { marginTop: '10px' };

        return <Alert bsStyle="info" style={style}>
            <h4>{title}</h4>
            {info}
            <br/>
            <br/>
            Details: <a href={url} target="_blank">{url}</a>
        </Alert>
    }
});

