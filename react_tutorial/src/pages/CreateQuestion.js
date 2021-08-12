import React from "react";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import csrftoken from "../utils/csrf";

function CreateQuestion()
{
	let [choices, setChoices] = useState({});
	let questionInputRef = useRef();
	let history = useHistory();

	function handleAddChoice(e)
	{
		e.preventDefault();
		setChoices((prevState)=>{
			/* key gets saved on "name" attribute @ getChoicesRows */
			let key = getRandomString();
			return {
				...prevState,
				[key]: {
					"choice_text": "",
				}
			};

		});
	}

	function handleChoiceChange(e)
	{
		setChoices((prevState)=>{
			/* key was saved on "name" attribute @ getChoicesRows */
			let key = e.target.name;
			return {
				...prevState,
				[key]: {
					"choice_text": e.target.value,
				}
			};
		});
	}

	function handleChoiceDeletion(e)
	{
		e.preventDefault();
		setChoices((prevState)=>{
			let key = e.target.name;
			let newState = removeKey(key, prevState);
			return newState;
		});
	}

	function handleSubmit(e)
	{
		e.preventDefault();
		let choicesList = getChoicesList(choices);
		let questionText = questionInputRef.current.value;
		fetch("http://127.0.0.1:8000/polls/create/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": csrftoken,
			},
			body: JSON.stringify({
				choices: choicesList,
				question_text: questionText,
				}),
		}).then((res)=>{
			return res.json();
		}).then((data)=>{
			history.replace("/");
		});
	}

	let choicesRow = getChoicesRows(choices, handleChoiceChange, handleChoiceDeletion);
	return (
		<div className="createForm">
		<fieldset>
			<legend>
				<h2>Question Creation Form</h2>
			</legend>
			<form>
				<label className="questionLabel" htmlFor="question_text">Question Text</label>
				<input
					className="questionInput"
					name="question_text"
					type="text"
					required
					placeholder="Ex.: Why does javascript suck?"
					ref={ questionInputRef }
				/>
				{ choicesRow }
				<button className="button edit large" onClick={ handleAddChoice }>add new choice</button>
				<button className="button create large" onClick={ handleSubmit }>submit question!</button>
			</form>
		</fieldset>
		</div>
	);
}

function getChoicesRows(choices, handleChoiceChange, handleChoiceDeletion)
{
	let choicesRows = [];
	let i = 0;
	for (const [key, choice] of Object.entries(choices)) {
		choicesRows.push(
			/* using key for unique identifier
			 * and as input/button name for extraction
			 * at handleChoiceChange and handleChoiceDeletion
			 */
			<li key={ key }>
				<div className="choiceInput">
					<label htmlFor="choice{ i }">Choice { i }</label>
					<input
						onChange={ handleChoiceChange }
						name={ key }
						type="text"
						required
						value={ choice.choice_text }
					/>
					<button
					onClick={ handleChoiceDeletion }
					name={ key }
					className="button delete">
						-
					</button>
				</div>
			</li>
		);
		i++;
	}
	return choicesRows;
}

/* extraction of key before submition since it's just
 * useful for React
 */
function getChoicesList(choices)
{
	let choicesList = [];
	for (const [, choice] of Object.entries(choices)) {
		choicesList.push(choice);
	}
	return choicesList;
}

/* useful when removing choices */
function removeKey(rmKey, obj)
{
	let newObj = {};
	for (const [key,] of Object.entries(obj)) {
		if (key === rmKey)
			continue;
		newObj[key] = obj[key];
	}
	return newObj;
}

function getRandomString()
{
	return (Math.random() + 1).toString(36).substring(7);
}

export default CreateQuestion;
