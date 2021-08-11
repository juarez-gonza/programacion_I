import React from "react";

function Question(props)
{
	return (
			<div className="card">
				<h3>{ props.q.question_text }</h3>
				<div class="cardButtons">
					<button onClick={ props.onEdit } className="button edit">edit</button>
					<button onClick={ props.onDelete } className="button delete">delete</button>
				</div>
			</div>
	);
}

export default Question;
