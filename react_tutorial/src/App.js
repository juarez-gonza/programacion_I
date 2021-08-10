import './App.css';
import React from "react";
import QuestionList from "./components/QuestionList";
import Layout from "./layout/Layout";

function App()
{
	let questions = [
		{
			question_text: "What?",
			id: 1,
		},
		{
			question_text: "Who?",
			id: 2,
		},
		{
			question_text: "What's the fastest animal alive?",
			id: 3,
		}
	];

	return (
		<React.Fragment>
			<Layout/>
			<QuestionList questions={questions}/>
		</React.Fragment>
	);
}

export default App;
