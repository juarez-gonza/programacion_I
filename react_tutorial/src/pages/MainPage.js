import React from "react";

import { useState, useEffect } from "react";

import QuestionList from "../components/QuestionList";
import Question from "../components/Question";
import EditForm from "../components/EditForm";
import DeleteConfirmation from "../components/DeleteConfirmation";

import Modal from "../layout/Modal";
import Backdrop from "../layout/Backdrop";

import csrftoken from "../utils/csrf";

function MainPage()
{

	let [ choices, setChoices ] = useState([]);
	let [ questions, setQuestions ] = useState([])
	let [ toTargetQuestion, setToTargetQuestion ] = useState(null);

	let [ showModal, setShowModal] = useState(false);
	let [ showEdit, setShowEdit ] = useState(false);
	let [ showDelete, setShowDelete ] = useState(false);
	let [ pageLoading, setPageLoading ] = useState(true);

	useEffect(()=>{
		fetch("http://127.0.0.1:8000/polls/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": csrftoken,
			}
		}).then((res)=>{
			return res.json();
		}).then((data)=>{
			setQuestions(data);
			setPageLoading(false);
		});
	}, []);

	function handleShowModal()
	{
		setShowModal((prevState)=> {
			return !prevState;
		});

		/* since this handles edit and delete closing...
		 * setToTargetQuestion and setChoices wont hurt
		 * there i think, just execute needlessly but meh
		 */
		setShowEdit((prevState)=> {
			if (prevState)
				return !prevState;
			return prevState;
		});
		setToTargetQuestion(null);
		setChoices([]);

		setShowDelete((prevState)=> {
			if (prevState)
				return !prevState;
			return prevState;
		});

	}

	function handleOpenEdit(e)
	{
		let questionId = e.target.name;
		handleShowModal();
		fetch(`http://127.0.0.1:8000/polls/${questionId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": csrftoken,
			}
		}).then((res)=>{
			return res.json();
		}).then((data)=>{
			/* must call after show modal since show modal
			 * will call setShowEdit(false), setToTargetQuestion(false)
			 * and setChoices([]) if it finds it true showEdit as true
			 */
			setToTargetQuestion(data.question);
			setChoices(data.choices);
			setShowEdit(true);
		});
	}

	function handleOpenDelete(e)
	{
		/* id saved in button name but as a string */
		let questionId = Number(e.target.name);
		handleShowModal();

		/* find the question for post setToTargetQuestion */
		let newTarget = questions.filter((q)=>{
			return q.id === questionId;
		})[0];
		/* must call after show modal since show modal
		 * will call setShowEdit(false) if it finds it true
		 * in order to handle the closing logic
		 */
		setToTargetQuestion(newTarget);
		setShowDelete(true);
	}

	function handleEditSubmit(e)
	{
		if (toTargetQuestion === null)
			throw new Error("no question to edit");

		/* name attribute of button in each choice
		 * of EditForm has the id of the corresponding choice
		 */
		let questionId = toTargetQuestion.id;
		let choiceId = e.target.name;
		fetch(`http://127.0.0.1:8000/polls/${questionId}/vote/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": csrftoken,
			},
			body: JSON.stringify({
				choice: choiceId,
				}),
		}).then((res)=>{
			return res.json();
		}).then(()=>{
			// will take care of setShowEdit,
			// setToTargetQuestion and setChoices

			setShowModal(false);
		});
	}

	function handleDeleteConfirmation(e)
	{
		if (toTargetQuestion === null)
			throw new Error("no question to edit");

		/* id saved in button name but as a string */
		let questionId = Number(e.target.name);
		fetch(`http://127.0.0.1:8000/polls/${questionId}/delete/`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": csrftoken,
			},
		}).then((res)=>{
			/* will take care of setShowDelete,
			 * setToTargetQuestion
			 */
			setShowModal(false);
			/* pop out the deleted question */
			let newQuestions = questions.filter((q)=>{
				return q.id !== questionId;
			});
			setQuestions(newQuestions);
		});
	}

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
			{ showDelete ?
				<DeleteConfirmation
				question={ toTargetQuestion }
				onCancel={ handleShowModal }
				onDeleteConfirmation={ handleDeleteConfirmation }
				/>
			:
			showEdit ?
				<EditForm
				question={ toTargetQuestion }
				choices={ choices }
				onCancel={ handleShowModal }
				onEditSubmit={ handleEditSubmit }
				/>
			:
			<h1>Loading</h1>
			}
		</Modal>
		<Backdrop onClick={ handleShowModal } />
		</React.Fragment>
	);

	return (
		<React.Fragment>
			{ pageLoading ?
				<h1>Loading</h1>
			:
				<QuestionList>{ qcomps }</QuestionList>
			}
			{ showModal && extraContent }
		</React.Fragment>
	);
}

export default MainPage;
