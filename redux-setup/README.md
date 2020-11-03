# setup-redux

Here we are initializing redux and adding our first actions.

To start, install the following packages with npm:

```bash
    npm i react-redux
    npm i redux
    npm i redux-devtools-extension
    npm i redux-thunk
```

Next go over to the `src/index.js` file and modify our initial bootstrap step to include the `Provider` as you see here:

```js
// step 1 add these imports
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";

const initialState = {};
const { store } = configureStore(initialState);

ReactDOM.render(
	// step 2 wrap your app in the Provider here
	// <React.StrictMode>
	//   <App />
	// </React.StrictMode>,
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
```

Note the use of the `configureStore` method, as it sets up the interaction with redux that is to be had by the application as you see here:

```js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index";

const middleware = [thunk];
const enhancers = [];

// create enhancers to include middleware
// thunk allows you to dispatch functions between the actions
const composedEnhancers = composeWithDevTools(
	applyMiddleware(...middleware),
	...enhancers
);

// create the store and return it to the application onload
// note that here we are including our reducers to setup our store and interactions across the application
export default function configureStore(initialState) {
	const store = createStore(rootReducer, initialState, composedEnhancers);

	return { store };
}
```

Finally, add the actions, reducers, and effects that you see in the `redux` folder. This should setup your initial flow for the `episodes` page.

On the actual `EpisodesPage` component, you'll also need to include the use of a selector as you see here:

```js
const dispatch = useDispatch();

// first read in the values from the store through a selector here
const episodes = useSelector((state) => state.Episodes.episodes);

useEffect(() => {
	dispatch(EpisodesActions.retrieveEpisodes());
}, [dispatch]);
```

When we interact with redux here we are also using hooks. This is much easier than the `connect` methods that were used in earlier version of React.
