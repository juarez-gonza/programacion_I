import React from "react";

function Question(props)
{
	return (
			<div className="card">
				<h3>{ props.q.question_text }</h3>
				<div class="cardButtons">
					<button className="edit">edit</button>
					<button className="delete">delete</button>
				</div>
			</div>
	);
}

export default Question;
