const constants = {
    APP_TOGGLE_LEFT_PANEL: '--',
    APP_LIFT_SUCCESS: '--',
    APP_LOGIN_PAGE_STATE: '--',

    AUTH_CLEAN_ERROR: 'Clean login error',

    AUTH_RESET_PASSWORD_START: 'User send to server reset password request',
    AUTH_RESET_PASSWORD_SUCCESS: 'Password reset request success',
    AUTH_RESET_PASSWORD_FAIL: 'Password reset request fail',

    AUTH_NEW_PASSWORD_START: 'User send to server new password',
    AUTH_NEW_PASSWORD_SUCCESS: 'Password reset request success',
    AUTH_NEW_PASSWORD_FAIL: 'Password reset request fail',

    AUTH_UNLOCK_START: 'Start unlock process',
    AUTH_UNLOCK_SUCCESS: 'Unlock success',
    AUTH_UNLOCK_FAIL: 'Unlock fail',


    SHOW_TARGET_MODAL: '--',
    HIDE_TARGET_MODAL: '--',
    ADD_TARGET: 'ADD_TARGET',
    ADD_TARGET_SUCCESS: 'ADD_TARGET_SUCCESS',
    ADD_TARGET_FAIL: 'ADD_TARGET_FAIL',

    COMMENTS_FETCH_SUCCESS: 'New comments arrived',

    FEED_FETCH_SUCCESS: '--',

    ISSUES_FETCH_START: '--',
    ISSUES_FETCH_SUCCESS: '--',
    ISSUES_FETCH_FAIL: 'Issues list fetch fail',
    ISSUES_UPDATE_FILTER: '--',
    ISSUES_UPDATE_SORT: '--',
    ISSUE_UPDATE_START: '--',
    ISSUE_UPDATE_SUCCESS: '--',
    ISSUE_UPDATE_FAIL: '--',
    ISSUE_EDIT_CHANGE: 'When issue in form changed',
    ISSUE_CREATE_START: 'Start issue creating',
    ISSUE_CREATE_SUCCESS: 'New issue created',
    ISSUE_CREATE_FAIL: 'Issue create fail',
    ISSUE_COMMENTS_FETCH_SUCCESS: 'Fetch comments for issue',

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
    TARGETS_CHANGE_EDITABLE: 'Change current edited (created) target',

    TARGET_COMMENTS_FETCH_SUCCESS: 'Comments for target received',

    TECHS_FETCH_SUCCESS: 'Technologies fetch success',

    TOAST_ADD: '--',

    TOKEN_CREATE_START: 'Create new token',
    TOKEN_CREATE_SUCCESS: 'Create new token success',
    TOKEN_CREATE_FAIL: 'Create new token error',
    TOKEN_REMOVE_SUCCESS: 'Token removed',
    TOKENS_FETCH_START: 'Tokens fetch start',
    TOKENS_FETCH_SUCCESS: 'Tokens received',
    TOKENS_FETCH_FAIL: 'Tokens not received',

    USER_NEW_CHANGE: 'Change new user data',
    USER_CREATE_START: 'Start add new user',
    USER_CREATE_SUCCESS: 'user created',
    USER_CREATE_FAIL: 'Cant add new user',

    USER_LOGIN_START: '--',
    USER_LOGIN_SUCCESS: '--',
    USER_LOGIN_FAIL: '--',

    USER_LOGOUT_START: '--',
    USER_LOGOUT_SUCCESS: '--',
    USER_LOGOUT_FAIL: '--',
    USER_LOST_AUTH: '--',

    USERS_FETCH_START: 'Fetch users data start',
    USERS_FETCH_SUCCESS: 'Fetch users data',
    USERS_FETCH_FAIL: 'Fetch users data fail',
    USERS_PAGE_FETCH_START: 'Fetch users data start',
    USERS_PAGE_FETCH_SUCCESS: 'Fetch users data',
    USERS_PAGE_FETCH_FAIL: 'Fetch users data fail',
    USERS_SET_PASSWORD_START: 'Start set user password by admin',
    USERS_SET_PASSWORD_SUCCESS: 'User password changed',
    USERS_SET_PASSWORD_FAIL: 'Set password fail',

    US_PASSWORD_FIELD_CHANGE: '--',
    US_OLD_PASSWORD_FIELD_CHANGE: 'Change old password in change password field',
    US_PASSWORD_CHANGE_START: 'Start changing password with backend',
    US_PASSWORD_CHANGE_SUCCESS: 'Success changing password with backend',
    US_PASSWORD_CHANGE_FAIL: 'Fail changing password with backend, param: error message',


    PROJECT_ADD_MEMBER: '--',
    PROJECT_REMOVE_MEMBER: '--',
    PROJECT_FETCH_SUCCESS: '--',
    PROJECT_MEMBERS_SUGGEST_FETCH_SUCCESS: '--',

    PROJECTS_FETCH_SUCCESS: '--',
    PROJECTS_SET_CURRENT: '--',

    VULNS_FETCH_START: 'Start fetching vulns list',
    VULNS_FETCH_SUCCESS: 'Success fetching vulns list',

    ________: false // dont want delete "," after duplicate line
};


const key = '_';
Object.keys(constants).forEach(function(c) {
    constants[c] = c + key;
});

module.exports = constants;
