import { ContactActionTypes } from '../actionTypes';
import axios from 'axios';

const contactEndpoint =
    'https://us-central1-intro-to-redux-lab.cloudfunctions.net/app/message/send';

export function sendingContact(contact) {
    return { type: ContactActionTypes.SENDING_CONTACT, contact };
}

export function contactSuccess(response) {
    return { type: ContactActionTypes.CONTACT_SUCCESS, response };
}

export function contactError(error) {
    return { type: ContactActionTypes.CONTACT_ERROR, error };
}

// here we introduce a side effect
// best practice is to have these alongside actions rather than an "effects" folder
export function sendContact(contact) {
    return function (dispatch) {
        // first call sending contact to start the process
        dispatch(sendingContact(contact));
        // actually call the HTTP endpoint here with the value to send
        return axios
            .post(contactEndpoint, contact)
            .then((response) => {
                dispatch(contactSuccess(response));
            })
            .catch((error) => {
                dispatch(contactError(error));
            });
    };
}
