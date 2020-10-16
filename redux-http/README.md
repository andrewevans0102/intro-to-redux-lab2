# redux-http

In this section we setup the application to use an actual HTTP call. This is one of the most common ways to use redux and is considered a "side effect" in the flux pattern.

The general best practice is to put the "side effect" alongside the actions. If you look in the `redux` folder you'll see Contact Actions, ActionTypes, and Reducers that are created.

A good convention to use with redux is to have an action that initializes the process, a second action that actually calls the process, and then a `success` and `failure` action to suit. You can see this here:

```js
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
```

If you notice the `sendContact` action is called, then it calls `sendingContact` and then it makes the HTTP call and responds with either a `contactSuccess` or `contactError` response.

Once you've built out the redux parts, you can connect it to your component like so:

```js
const dispatch = useDispatch();

// when you make the rest call, the response can be seen in the selector here
const response = useSelector((state) => state.Contact.response);

// when an error occurs it should appear here
const errors = useSelector((state) => state.Contact.errors);

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
```

Then in your template you can catch the response or errors with a check on the `selectors` as happens with the following:

```js
{
    response !== undefined && (
        <article className="contact__response">
            Success with a return of {response.status.toString()}
        </article>
    );
}
{
    errors.length > 0 && (
        <article className="contact__error">
            Error occured with message "{errors[0].message}"
        </article>
    );
}
```

This pattern scales well, and can be used throughout the HTTP calls in your components.
