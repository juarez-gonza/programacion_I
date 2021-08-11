import React from "react";

function EditForm(props)
{
	let ccomps = props.choices.map((c)=>{
		return (
			<div className="choiceRow" key={ c.id }>
				<span className="choiceText">{ c.choice_text }</span>
				<div>
					<button className="button edit ">+</button>
					<button className="button delete">delete</button>
					<span className="choiceVotes">{ c.votes }</span>
				</div>
			</div>
		);
	});

	return (
		<div className="editForm">
			<fieldset className="choicesContainer">
			<legend><h2>Votes for "{ props.question.question_text }"</h2></legend>
			{ ccomps }
			</fieldset>
			<button className="button large create">Or create a new choice!</button>
			<button onClick={ props.onCancel } className="button large cancel">go back</button>
		</div>
	);
}

export default EditForm;
