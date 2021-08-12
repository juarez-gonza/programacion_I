import React from "react";

function DeleteConfirmation(props)
{
	return (
		<div className="deleteConfirmation">
			<h2>Delete question: "{ props.question.question_text }?"</h2>
			<button name={ props.question.id } onClick={ props.onDeleteConfirmation } className="button delete large">delete</button>
			<button onClick={ props.onCancel } className="button cancel large">go back</button>
		</div>

	);
}

export default DeleteConfirmation;
