'use strict';

var constants = {
    AGENTS_FETCH_SUCCESS: '--',

    APP_TOGGLE_LEFT_PANEL: '--',
    APP_LIFT_SUCCESS: '--',
    APP_LOGIN_PAGE_STATE: '--',

    SHOW_TARGET_MODAL: '--',
    HIDE_TARGET_MODAL: '--',
    ADD_TARGET: 'ADD_TARGET',
    ADD_TARGET_SUCCESS: 'ADD_TARGET_SUCCESS',
    ADD_TARGET_FAIL: 'ADD_TARGET_FAIL',

    FEED_FETCH_SUCCESS: '--',

    ISSUES_FETCH_START: '--',
    ISSUES_FETCH_SUCCESS: '--',
    ISSUES_UPDATE_FILTER: '--',
    ISSUES_UPDATE_SORT: '--',
    ISSUE_UPDATE_START: '--',
    ISSUE_UPDATE_SUCCESS: '--',
    ISSUE_UPDATE_FAIL: '--',

    MODAL_OPEN: '--',
    MODAL_CLOSE: '--',

    PLAN_ADD: '--',
    PLANS_FETCH_SUCCESS: '--',
    PLANS_SET_SELECTED: '--',
    PLANS_SELECT: '--',
    PLAN_CHANGE: '--',
    PLAN_REMOVE_SUCCESS: '--',
    PLAN_SAVE_START: '--',
    PLAN_SAVE_SUCCESS: '--',
    PLAN_SAVE_ERROR: '--',
    PLAN_WORKFLOW_CHANGE: '--',
    PLAN_NEW_STEP: '--',

    PLUGINS_FETCH_SUCCESS: '--',

    REMOVE_TARGET_START: '--',
    REMOVE_TARGET_SUCCESS: '--',
    REMOVE_TARGET_FAIL: '--',

    REPORTS_FETCH_SUCCESS: '--',

    REPORTS_FETCH: '--',
    REPORTS_SEVERITY_SELECT: '--',

    SCANS_DETECT_CREATED: '--',
    SCANS_FETCH_SUCCESS: '--',
    SCANS_CREATION: '--',

    TARGETS_FETCH_START: '--',
    TARGETS_FETCH_SUCCESS: '--',
    TARGETS_FETCH_FAIL: '--',
    TARGETS_SET_CURRENT: '--',
    TARGETS_UNSET_CURRENT: '--',
    TARGETS_COMMENTS_FETCH_SUCCESS: '--',

    TOAST_ADD: '--',


    USER_LOGIN_START: '--',
    USER_LOGIN_SUCCESS: '--',
    USER_LOGIN_FAIL: '--',

    USER_LOGOUT_START: '--',
    USER_LOGOUT_SUCCESS: '--',
    USER_LOGOUT_FAIL: '--',
    USER_LOST_AUTH: '--',

    USERS_FETCH_SUCCESS: '--',


    PROJECT_ADD_MEMBER: '--',
    PROJECT_REMOVE_MEMBER: '--',
    PROJECT_FETCH_SUCCESS: '--',
    PROJECT_MEMBERS_SUGGEST_FETCH_SUCCESS: '--',

    PROJECTS_FETCH_SUCCESS: '--',
    PROJECTS_SET_CURRENT: '--',

    ________: false // dont want delete "," after duplicate line
};



var key = '_';
Object.keys(constants).forEach(function(c) {
    constants[c] = c + key;
});

module.exports = constants;
