import React, { useState, useEffect } from "react";

export const InputToDo = () => {
	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState([]);

	return (
		<div className="main">
			<h1>todos</h1>
			<input
				type="text"
				placeholder="What need to be done?"
				onChange={handTaskChange}
				onKeyPress={handleTaskListChange}
			/>
			<h2>{task}</h2>
		</div>
	);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/tozzi")
			.then(response => response.json())
			.then(data => {
				this.setState(this.state.lista.concat(data));
			});
	});
	function handTaskChange(e) {
		setTask(e.target.value);
	}

	function handleTaskListChange(e) {
		if (e.key === "Enter") {
			if (e.target.value.split(" ").join("").length > 0) {
				setTaskList([...taskList, e.target.value]);
			}
			e.target.value = "";
		}
	}
};
