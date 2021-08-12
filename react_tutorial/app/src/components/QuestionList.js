import React from "react";

function QuestionList(props)
{
	return (
		<div className="cardContainer">
			{ props.children }
		</div>
	);
}

export default QuestionList;
