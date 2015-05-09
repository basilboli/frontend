'use strict';
import React, { PropTypes } from 'react/addons';
import _ from 'lodash';
import actions from '../../actions/report.actions';

var ReportIssuesTotal = require('../report-issues-total'),
    SeverityLevelDesc = require('../severity-level-desc'),
    ReportIssuesDetail = require('../report-issues-detail'),
    { Row, Col, Panel } = require('react-bootstrap');

var ReportIssues = React.createClass({
    propTypes: {
        severity: PropTypes.string,
        reports: PropTypes.array.isRequired
    },

    render: function() {
        var { severity, reports } = this.props,
            issues = this.getIssuesFromReports(reports),
            selectedIssues = issues[severity] || [];


        return (
            <div className="c-report-issues">
                <div>
                    {this.renderTotal('high', issues)}
                    {this.renderTotal('medium', issues)}
                    {this.renderTotal('low', issues)}
                    <div style={{ clear: 'both' }}></div>
                </div>
                {selectedIssues.length ? this.renderDetails(selectedIssues, severity) : <span></span>}
            </div>
        );
    },

    renderDetails: function(issues, severity) {
        return (
            <div className="c-report-issues--details">
                <h3>{iget('Detailed report')}</h3>

                <div classNamae="c-report-issues-desc">
                    <SeverityLevelDesc severity={severity} count={issues.length}/>
                </div>
                <br/>
                <Row>
                    <Col xs={12}>
                        <ReportIssuesDetail issues={issues}/>
                    </Col>
                </Row>
            </div>
        );
    },

    renderTotal: function(severity, issues) {
        return (
            <ReportIssuesTotal
                severity={severity}
                selected={this.props.severity === severity}
                count={issues[severity].length}/>
        );
    },

    getIssuesFromReports: function(reports) {
        var issues = {
            info: [],
            low: [],
            medium: [],
            high: [],
            error: []

        };

        reports.forEach((report) => {
            if (report.type === 'issues') {
                report.issues.forEach(function(issue) {
                    issues[issue.severity].push(issue);
                });
            }

            if (report.type === 'multi') {
                var subIssues = this.getIssuesFromReports(report.multi);

                this.mergeIssues(issues, subIssues);
            }

        });

        return issues;
    },

    mergeIssues: function(target, source) {
        return _.assign(target, source, function(a, b) {
            if (_.isUndefined(a)) return b;

            return _.isArray(a) ? a.concat(b) : undefined;
        });
    }
});

module.exports = ReportIssues;


if (module.hot) {
    module.hot.accept([
        '../report-issues-total',
        '../report-issues-detail'
    ], function() {
        //TODO flux add actions
    });
}
