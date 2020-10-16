# redux-actions

In this section, you'll follow the same process you did to setup the `EpisodesPage` to setup Quotes.

You'll create:

-   `src/redux/actions/Quotes.js`
-   `src/redux/actionsTypes/Quotes.js`
-   `src/redux/actions/reducers/Quotes.js`

Then in the `QuotesPage` component you'll setup the same `action --> effect --> action --> reducer` flow that we did before.

```js
const dispatch = useDispatch();

// first read in the values from the store through a selector here
const quotes = useSelector((state) => state.Quotes.quotes);

useEffect(() => {
    // if the value is empty, send a dispatch action to the store to load the episodes correctly
    if (quotes.length === 0) {
        dispatch(QuotesActions.retrieveQuotes());
    }
});
```
