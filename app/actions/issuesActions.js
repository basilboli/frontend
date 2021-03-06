import { issues } from '../lib/api3';
import { extractor } from '../lib/helpers';
import { dispatch } from '../lib/disp';
import C from '../constants';
import { cloneDeep, merge, isNaN, isBoolean, isString, includes } from 'lodash';
import { HIGH, MEDIUM, LOW, INFO, all as severities } from '../lib/severities';
import issueCreateStore from '../stores/issue-create.store';
import router from '../router';
import { captureException } from '../lib/raven';
import issuesListStore from '../stores/issuesListStore';

const dispatchFetch = res => dispatch(C.ISSUES_FETCH_SUCCESS, res);

export async function fetchPage({ target, page = 1 } = {}) {
    if (!target) {
        target = issuesListStore.getState().targetId;
    }

    dispatch(C.ISSUES_FETCH_START, { target, page });

    const { pageSize } = issuesListStore.getState();
    const skip = (page - 1) * pageSize;
    const query = {
        target,
        skip,
        limit: pageSize
    };
    const filter = issuesListStore.getState().filter;

    ['false', 'muted', 'confirmed', 'resolved'].forEach(name => {
        const value = filter.get(name);

        if (isBoolean(value)) {
            query[name] = value;
        }
    });

    const severity = filter.get('severity');
    if (includes(severities, severity)) query.severity = severity;

    const search = filter.get('search');
    if (search) query.search = search;

    const vulnType = filter.get('vulnType');
    if (vulnType) query.vulnType = vulnType;

    try {
        const result = await issues.list(query);
        dispatch(C.ISSUES_FETCH_SUCCESS, result);
    }
    catch (error) {
        dispatch(C.ISSUES_FETCH_FAIL, { error });
        captureException(error);
    }
}

/**
 * Load issues fro issues page
 * @param {String} [target] target id
 */
export function loadForTarget({ target }) {
    dispatch(C.ISSUES_FETCH_START, { target });
    issues.list({ target })
        .then(dispatchFetch);
}

/**
 * Fetch one issue
 * @param {String} id issue id
 */
export function fetchOne(id) {
    const wrap = issue => {
        return { results: [issue] };
    };

    issues.get(id)
        .then(wrap)
        .then(dispatchFetch);
}

/**
 * Update issues list filter
 * @param {Map} filter new filter
 */
export async function updateFilter(filter) {
    dispatch(C.ISSUES_UPDATE_FILTER, filter);

    fetchPage();
}

/**
 * Update issues list sort filed
 * @param {String} sortBy
 */
export function updateSort(sortBy) {
    dispatch(C.ISSUES_UPDATE_SORT, sortBy);
}


/**
 * Toggle issue status
 * @param {Model} issue issue
 * @param {String} statusName status name (confirmed, false, muted, resolved)
 */
export function toggleStatus(issue, statusName) {
    const issueId = issue.get('id');
    const status = !issue.get(statusName);

    dispatch(C.ISSUE_UPDATE_START, {
        id: issueId,
        [statusName]: status
    });

    issue = issue.set(statusName, status);
    issue = issue.toJS();
    delete issue.vector;
    delete issue.references;
    delete issue.extras;

    issues
        .update({
            issueId,
            body: issue
        })
        .catch(e => {
            showError(e);

            dispatch(C.ISSUE_UPDATE_FAIL, {
                id: issueId,
                [statusName]: !status
            });

            captureException(e);
        });
}

/**
 * Increase issue severity
 * @param {Model} issue
 */
export function increaseSeverity(issue) {
    let severity = issue.get('severity');

    if (severity === HIGH) return;

    if (severity === INFO) {
        severity = LOW;
    }
    else if (severity === LOW) {
        severity = MEDIUM;
    }
    else if (severity === MEDIUM) {
        severity = HIGH;
    }

    changeSeverity(issue, severity);
}

/**
 * Decrease issue severity
 * @param {Model} issue
 */
export function decreaseSeverity(issue) {
    let severity = issue.get('severity');

    if (severity === INFO) return;

    if (severity === LOW) {
        severity = INFO;
    }
    else if (severity === MEDIUM) {
        severity = LOW;
    }
    else if (severity === HIGH) {
        severity = MEDIUM;
    }

    changeSeverity(issue, severity);
}

/**
 * Change current edit issue (or new issue)
 * @param {Map} issue new issue
 */
export function changeEditableIssue(issue) {
    dispatch(C.ISSUE_EDIT_CHANGE, { issue });
}

/**
 * Save edit issue (is new - create)
 * @param {Object} mergeData data to merge to issue
 *
 */
export async function saveEditableIssue(mergeData) {
    let { issue } = issueCreateStore.getState();

    //TODO check issue data

    dispatch(C.ISSUE_CREATE_START);

    issue = issue.toJS();
    issue.vulnType = parseInt(issue.vulnType, 10);
    if (isNaN(issue.vulnType)) issue.vulnType = 0;
    issue = merge(issue, mergeData);

    try {
        let data = await issues.create({ body: issue });

        dispatch(C.ISSUE_CREATE_SUCCESS, { issue: data });
        router.get().transitionTo('issue', { issueId: data.id });
    }
    catch (e) {
        const message = e.message || e.data && e.data.Message || iget('Server error');

        dispatch(C.ISSUE_CREATE_FAIL, { message });

        captureException(e);
    }
}

//region locals
function changeSeverity(issue, severity) {
    const oldSeverity = issue.get('severity');
    const summary = issue.get('summary');
    const target = issue.get('target');
    const issueId = issue.get('id');

    dispatch(C.ISSUE_UPDATE_START, {
        severity,
        id: issueId
    });

    issues
        .update({
            issueId,
            //TODO remove summary https://github.com/bearded-web/bearded/issues/74
            body: { severity, summary, target }
        })
        .catch(e => {
            showError(e);

            dispatch(C.ISSUE_UPDATE_FAIL, {
                id: issueId,
                severity: oldSeverity
            });
        });
}


//endregion privates


//TODO delete, used for dev
function addFakeIssueToData(data) {
    let i = cloneDeep(data.results[0]);
    i.id = Math.random();
    i.summary += Math.random();
    i.severity = Math.random() > 0.5 ? 'high' : 'low';
    i.created = require('moment')()
        .subtract(Math.random() * 1000, 'day')
        .format();
    data.results.push(i);
    return data;
}
