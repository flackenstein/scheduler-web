import { userConstants } from '../constants';
import { userApi } from '../../api';
import { alertActions } from './';
import { history } from '../../helpers';

export const userActions = {
    login,
    logout
};

// Login Dispatch Handlers
function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userApi.login(username, password)
            .then( user => {
                if (user) {
                    dispatch(success(user));
                    history.push('/');
                }
            })
            .catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            });
    };

}

function logout() {
    userApi.logout();
    return { type: userConstants.LOGOUT };
}
