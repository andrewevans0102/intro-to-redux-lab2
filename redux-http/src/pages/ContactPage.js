import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { ContactActions } from '../redux/actions';
import '../styles/styles.scss';

const useStyles = makeStyles((theme) => ({
    circle: {
        margin: '48px auto',
        display: 'block',
    },
}));

function ContactPage(props) {
    const dispatch = useDispatch();

    // when you make the rest call, the response can be seen in the selector here
    const response = useSelector((state) => state.Contact.response);

    // when an error occurs it should appear here
    const errors = useSelector((state) => state.Contact.errors);

    // when working on this part of the project
    // check out https://intro-to-redux-lab.web.app to view the messages you send
    const classes = useStyles();
    // const messageEndpoint =
    //     'https://us-central1-intro-to-redux-lab.cloudfunctions.net/app/message/send';
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');
    const [progress, setProgress] = useState(false);

    const handleFirstNameChange = (e) => {
        let value = e.target.value;
        setFirstName(value);
    };

    const handleLastNameChange = (e) => {
        let value = e.target.value;
        setLastName(value);
    };

    const handleMessageChange = (e) => {
        let value = e.target.value;
        setMessage(value);
    };

    const handleSubmit = (event) => {
        setProgress(true);
        event.preventDefault();
        const sendMessage = { firstName, lastName, message };
        dispatch(ContactActions.sendContact(sendMessage));
        // axios
        //     .post(messageEndpoint, sendMessage)
        //     .then((response) => {
        //         alert('success');
        //         setProgress(false);
        //     })
        //     .catch((error) => {
        //         alert('error');
        //         setProgress(false);
        //     });
    };

    useEffect(() => {
        if (response !== undefined) {
            setProgress(false);
        }

        if (errors.length > 0) {
            setProgress(false);
        }
    }, [response, errors]);

    return (
        <>
            {!progress && (
                <section className="contact">
                    <h1>Contact</h1>
                    <form onSubmit={handleSubmit}>
                        <span>
                            <label>First Name</label>
                            <input
                                type="text"
                                id="fname"
                                name="firstname"
                                placeholder="Your name.."
                                onChange={handleFirstNameChange}
                            />
                        </span>

                        <span>
                            <label>Last Name</label>
                            <input
                                type="text"
                                id="lname"
                                name="lastname"
                                placeholder="Your last name.."
                                onChange={handleLastNameChange}
                            />
                        </span>

                        <span>
                            <label>Message</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Write something.."
                                onChange={handleMessageChange}
                            ></textarea>
                        </span>
                        <button type="submit" className="contact__button">
                            submit
                        </button>
                    </form>
                    {response !== undefined && (
                        <article className="contact__response">
                            Success with a return of{' '}
                            {response.status.toString()}
                        </article>
                    )}
                    {errors.length > 0 && (
                        <article className="contact__error">
                            Error occured with message "{errors[0].message}"
                        </article>
                    )}
                </section>
            )}
            {progress && (
                <div>
                    <CircularProgress className={classes.circle} />
                </div>
            )}
        </>
    );
}

export default ContactPage;
