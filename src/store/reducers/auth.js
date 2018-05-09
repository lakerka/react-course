import _ from 'lodash';

import * as actionTypes from '../actions/actionTypes';



const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authReducer = (state = initialState, action) => {
    const stateClone = _.cloneDeep(state);

    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...stateClone,
                error: false,
                loading: true,
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...stateClone,
                loading: false,
                token: action.token,
                userId: action.userId,
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...stateClone,
                loading: false,
                error: action.error,
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...stateClone,
                token: null,
                userId: null
            };
        default:
            return state;
    }
};

export default authReducer;
