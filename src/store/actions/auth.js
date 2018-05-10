import * as actionTypes from './actionTypes';
import client from '../../config';

export const authStart = () => ({ type: actionTypes.AUTH_START });

export const authSuccess = (token, userId) => ({ type: actionTypes.AUTH_SUCCESS, token, userId });

export const authFail = (error) => ({ type: actionTypes.AUTH_FAIL, error });

export const logout = () => {
    localStorage.removeItem('auth');
    return { type: actionTypes.AUTH_LOGOUT };
};

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
                const expirationDate = new Date(new Date().getTime() + expiresInMiliseconds);
                const auth = {
                    token: idToken,
                    expirationDate,
                    userId: localId
                };
                localStorage.setItem('auth', JSON.stringify(auth));
                dispatch(checkAuthTimeout(expiresInMiliseconds));
                dispatch(authSuccess(idToken, localId));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error.message))
            });
    }
};

export const tryAutoSignIn = () => {
    return dispatch => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (!auth) {
            return;
        }
        const { token, userId } = auth;
        let { expirationDate } = auth;
        expirationDate = new Date(expirationDate);
        const now = new Date();
        if (expirationDate > now) {
            const expiresInMiliseconds = expirationDate.getTime() - now.getTime();
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout(expiresInMiliseconds));
        }
    };
};
