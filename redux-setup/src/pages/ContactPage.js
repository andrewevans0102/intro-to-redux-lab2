import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import '../styles/styles.scss';

const useStyles = makeStyles((theme) => ({
    circle: {
        margin: '48px auto',
        display: 'block',
    },
}));

function ContactPage(props) {
    // when working on this part of the project
    // check out https://intro-to-redux-lab.web.app to view the messages you send
    const classes = useStyles();
    const messageEndpoint =
        'https://us-central1-intro-to-redux-lab.cloudfunctions.net/app/message/send';
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
        axios
            .post(messageEndpoint, sendMessage)
            .then((response) => {
                alert('success');
                setProgress(false);
            })
            .catch((error) => {
                alert('error');
                setProgress(false);
            });
    };

    useEffect(() => {
        setProgress(false);
    }, []);

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
