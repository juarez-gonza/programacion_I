import React from "react";
import Question from "./Question";

function QuestionList(props)
{
	let questions = props.questions.map((q) => {
		return (
				<Question key={ q.id } q={ q }/>
		);
	});
	return (
		<div className="cardContainer">
			{ questions }
		</div>
	);
}

export default QuestionList;
