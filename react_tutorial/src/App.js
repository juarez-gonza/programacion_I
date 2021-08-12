import './App.css';
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./layout/Layout";

import MainPage from "./pages/MainPage";
import CreateQuestion from "./pages/CreateQuestion";

function App()
{
	let links = {
		index: "/",
		create: "/create",
		random: [
			"https://youtu.be/4r7wHMg5Yjg",
			"https://github.com/torvalds/linux/blob/master/Documentation/process/coding-style.rst",
			"https://youtu.be/Ox0Kw4PjvsM",
			"https://youtu.be/kk0feCp_MZ4",
			"https://youtu.be/lg5WKsVnEA4",
			"https://youtu.be/XKyy1jni4CQ",
			"https://whydoesitsuck.com/why-does-javascript-suck/",
			"https://whydoesitsuck.com/why-does-php-suck/",
		],
	};
	return (
		<React.Fragment>
			<BrowserRouter>
				<Layout links={ links }/>
				<Switch>
					<Route path={ links.index } exact={ true } component={ MainPage }/>
					<Route path={ links.create } exact={ true } component={ CreateQuestion }/>
				</Switch>
			</BrowserRouter>
		</React.Fragment>
	);
}

export default App;
