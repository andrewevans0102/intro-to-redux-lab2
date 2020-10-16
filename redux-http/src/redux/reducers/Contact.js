import { ContactActionTypes } from '../actionTypes';

function Contact(state = ContactActionTypes.initialContactState, action) {
    switch (action.type) {
        case ContactActionTypes.SENDING_CONTACT:
            return Object.assign({}, state, {
                contact: action.contact,
            });
        case ContactActionTypes.CONTACT_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                response: action.response,
            });
        case ContactActionTypes.CONTACT_ERROR:
            return Object.assign({}, state, {
                ...state,
                errors: [...state.errors, action.error],
            });
        default:
            return state;
    }
}

export default Contact;
