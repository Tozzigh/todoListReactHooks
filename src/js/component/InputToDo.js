import React, { useState } from "react";

export function InputToDo() {
	const [taskList, setTaskList] = useState([]);

	return (
		<div className="main">
			<h1>todos</h1>
			<input type="text" placeholder="What need to be done?" onKeyPress={handleTaskListChange} />
			<ul>
				{taskList.map((todo, index) => (
					<li className="todos" key={index}>
						{todo}
						<i className="delLi fa fa-times" onClick={() => onDeleteClicked(index)} />
					</li>
				))}
				{taskCounter()}
			</ul>
		</div>
	);

	function onDeleteClicked(index) {
		setTaskList(taskList.filter((item, pos) => pos !== index));
	}

	function taskCounter() {
		const leng = taskList.length;
		if (leng === 0) {
			return <li className="taskCounter text-muted">No tasks, add a task</li>;
		} else if (leng === 1) {
			return <li className="taskCounter text-muted">{leng} item left</li>;
		} else if (leng > 1) {
			return <li className="taskCounter text-muted">{leng} items left</li>;
		}
	}

	function handleTaskListChange(e) {
		if (e.key === "Enter") {
			if (e.target.value.split(" ").join("").length > 0) {
				setTaskList([...taskList, e.target.value]);
			}
			e.target.value = "";
		}
	}
}
