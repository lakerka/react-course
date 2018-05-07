import {
    ADD_PERSON,
    DELETE_PERSON
} from './actionTypes';

const initialState = {
    persons: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PERSON:
            return {
                ...state,
                persons: state.persons.concat([action.person])
            };
        case DELETE_PERSON:
            return {
                ...state,
                persons: state.persons.filter(person => person.id !== action.personId)
            };
        default:
            return state
    }
}

export default reducer;