import * as actionTypes from './actionTypes';
import client from '../../config';

export const authStart = () => ({ type: actionTypes.AUTH_START });

export const authSuccess = (token, userId) => ({ type: actionTypes.AUTH_SUCCESS, token, userId });

export const authFail = (error) => ({ type: actionTypes.AUTH_FAIL, error });

export const logout = () => ({ type: actionTypes.AUTH_LOGOUT });

export const checkAuthTimeout = (timeoutMiliseconds) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, timeoutMiliseconds)
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        const apiKey = 'AIzaSyA0GdGhOZZe8RH1fElzWaUYsRjLI4Gir6Y';
        const signInUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + apiKey;
        const signUpUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + apiKey;
        let url = signInUrl;
        if (isSignUp) {
            url = signUpUrl;
        }
        client.post(url, authData)
            .then(response => {
                const { expiresIn, idToken, localId } = response.data;
                const expiresInMiliseconds = (+expiresIn)*1000;
                dispatch(checkAuthTimeout(expiresInMiliseconds));
                dispatch(authSuccess(idToken, localId))
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error.message))
            });
    }
};