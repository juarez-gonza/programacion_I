import './App.css';
import React from "react";
import { useState } from "react";

import QuestionList from "./components/QuestionList";
import Question from "./components/Question";
import Modal from "./layout/Modal";
import Backdrop from "./layout/Backdrop";
import Layout from "./layout/Layout";

import EditForm from "./components/EditForm";
import DeleteConfirmation from "./components/DeleteConfirmation";

function App()
{
	/* start of dummy values */
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

	let choices = [
		{
			id: 1,
			choice_text: "Don't know",
			votes: 0,
			question: 1,
		},
		{
			id: 2,
			choice_text: "???",
			votes: 2,
			question: 1,
		}

	]
	/* end of dummy values */

	let [ showModal, setShowModal] = useState(false);
	let [ showEdit, setShowEdit ] = useState(false);
	let [ showDelete, setShowDelete ] = useState(false);

	function handleShowModal()
	{
		setShowModal((prevState)=> {
			return !prevState;
		});

		setShowEdit((prevState)=> {
			if (prevState)
				return !prevState;
			return prevState;
		});

		setShowDelete((prevState)=> {
			if (prevState)
				return !prevState;
			return prevState;
		});
	}

	function handleOpenEdit()
	{
		handleShowModal();
		/* must call after show modal since show modal
		 * will call setShowEdit(false) if it finds it true
		 * in order to handle the closing logic
		 */
		setShowEdit(true);
	}

	function handleOpenDelete()
	{
		handleShowModal();
		/* must call after show modal since show modal
		 * will call setShowEdit(false) if it finds it true
		 * in order to handle the closing logic
		 */
		setShowDelete(true);
	}

	/*
	function handleEditSubmit()
	{
	}

	function handleDeleteConfirmation()
	{
	}
	*/

	let qcomps = questions.map((q) => {
		return (
				<Question key={ q.id }
				q={ q }
				onDelete={ handleOpenDelete }
				onEdit={ handleOpenEdit }
				/>
		);
	});

	let extraContent = (
		<React.Fragment>
		<Modal>
			{ showDelete &&
				<DeleteConfirmation onCancel={ handleShowModal } question={ questions[0] }/>
			}
			{ showEdit &&
				<EditForm
				question={ questions[0] }
				choices={ choices }
				onCancel= { handleShowModal }
				/>
			}
		</Modal>
		<Backdrop onClick={ handleShowModal } />
		</React.Fragment>
	);

	return (
		<React.Fragment>
			<Layout/>
			<QuestionList>{ qcomps }</QuestionList>
			{ showModal && extraContent }
		</React.Fragment>
	);
}

export default App;
