import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Imports Drizzle functions and contract artifact
import { Drizzle, generateStore } from "drizzle";
import BoxOffice from "./contracts/BoxOffice.json";

// Instantiating this will allow us to let Drizzle know what contracts we want
const options = { contracts: [BoxOffice] };

// Setup the Drizzle store and Drizzle
const drizzleStore = generateStore(options);
// This Drizzle instance will be passed in as a prop to App component below
const drizzle = new Drizzle(options, drizzleStore);


ReactDOM.render(<App drizzle={drizzle} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
