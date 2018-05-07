import {
    ADD_PERSON,
    DELETE_PERSON
} from './actionTypes';


export const addPerson = dispatch => person => dispatch({ type: ADD_PERSON, person });
export const deletePerson = dispatch => personId => dispatch({ type: DELETE_PERSON, personId });
