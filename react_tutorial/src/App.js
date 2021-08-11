import './App.css';
import React from "react";
import { useState } from "react";

import QuestionList from "./components/QuestionList";
import Question from "./components/Question";
import Modal from "./components/Modal";
import Backdrop from "./layout/Backdrop";
import Layout from "./layout/Layout";

import EditForm from "./components/EditForm";
import DeleteConfirmation from "./components/DeleteConfirmation";

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

	let choices = [
		{
			choice_text: "Don't know",
			votes: 0,
			question: 1,
		},
		{
			choice_text: "???",
			votes: 2,
			question: 1,
		}

	]

	let [ showModal, setShowModal] = useState(false);
	let [ showEdit, setShowEdit ] = useState(false);
	let [ showDelete, setShowDelete ] = useState(false);

	function handleShowModal()
	{
		setShowModal((prevState) => {
			return !prevState;
		});
	}

	function handleEdit()
	{
		handleShowModal();
	}

	function handleDelete()
	{
		handleShowModal();
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
				onDelete={ handleDelete }
				onEdit={ handleEdit }
				/>
		);
	});

	return (
		<React.Fragment>
			<Layout/>
			<QuestionList>{ qcomps }</QuestionList>
			<Modal>
				<DeleteConfirmation question={ questions[0] }/>
			</Modal>
			<Backdrop onClick={ handleShowModal } />
		</React.Fragment>
	);
	/*
	{ showModal && <Modal/> }
	{ showModal && <Backdrop onClick={ handleShowModal } /> }
				<EditForm
				question={ questions[0] }
				choices={ choices }
				/>
	*/
}

export default App;
