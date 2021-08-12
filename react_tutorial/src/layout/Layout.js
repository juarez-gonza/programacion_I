import React from "react";
import { NavLink } from "react-router-dom";

function randomnum(min, max)
{
	let rand;
	let ret;

	rand = Math.random() * (max - min); /* now in range [0, max-min) */
	ret = rand + min; /* now in range [min, max) */
	ret = Math.floor(ret); /* now floored down */

	return ret;
}

function getRandomLinks(randomLinks)
{
	const nRandomLinks = 2;
	let randomaTags = [];
	for (let i = 0; i < nRandomLinks; i++) {
		let randomIdx = randomnum(0, randomLinks.length);
		let randomLink = randomLinks[randomIdx];
		randomLinks = randomLinks.filter((_, idx)=>{
			return idx !== randomIdx;
		});
		randomaTags.push(
			<li key={ randomLink }>
				<a
				className="navlink"
				href={ randomLink }
				target="_blank"
				rel="noreferrer">
					Random Link
				</a>
			</li>
		);
	}
	return randomaTags;
}

function Layout(props)
{
	return (
		<nav className="navbar" >
			<span className="logo">
				<NavLink
				className="navlink"
				activeClassName="navlinkActive"
				to={ props.links.index }
				exact={ true }>
					Super-Mega Questions
				</NavLink>
			</span>
			<ul>
				{ getRandomLinks(props.links.random) }
				<li>
					<NavLink
					key={ props.links.create }
					className="navlink"
					activeClassName="navlinkActive"
					to={ props.links.create }
					exact={ true }>
						Create Question
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Layout;
