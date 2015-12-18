import React from 'react';
import { render } from 'react-dom';
import fetchPolyfill from './Util/Fetch';
import Router from './Router';
import './app.css';

if(!window.fetch) {
	fetchPolyfill()
}

render(<Router/>, document.body);