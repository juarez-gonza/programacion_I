import React from "react";

function Question(props)
{
	/* edit and delete button with name=id that
	 * way e.target.name gets the id right away
	 */
	return (
			<div className="card">
				<h3>{ props.q.question_text }</h3>
				<div className="cardButtons">
					<button name={ props.q.id } onClick={ props.onEdit } className="button edit">edit</button>
					<button name={ props.q.id } onClick={ props.onDelete } className="button delete">delete</button>
				</div>
			</div>
	);
}

export default Question;
