import React  from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import authReducer, { initialState } from './auth';
import * as actionTypes from '../actions/actionTypes';
import { BurgerBuilder } from './BurgerBuilder';


configure({ adapter: new Adapter() });

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState);
    });

    it('should save token and userId and set isAuthenticated to true upon login', () => {
        const action = {
            type: actionTypes.AUTH_SUCCESS,
            token: 'some-token',
            userId: 'some-user-id',
        };
        expect(authReducer(undefined, action)).toEqual({
            ...initialState,
            token: 'some-token',
            userId: 'some-user-id',
            isAuthenticated: true,
        });
    });
});
