import React, { useState, useEffect } from "react";

export function InputToDo() {
	const [taskList, setTaskList] = useState([]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/tozzigh")
			.then(response => response.json())
			.then(data => {
				for (let z in data) {
					setTaskList(taskList => [...taskList, data[z]]);
				}
			});
	}, []);

	useEffect(
		() => {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/tozzigh", {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(taskList)
			});
		},
		[taskList]
	);

	return (
		<div className="main">
			<h1>todos</h1>
			<input type="text" placeholder="What need to be done?" onKeyPress={handleTaskListChange} />
			{createLi(taskList)}
		</div>
	);

	function createLi(list) {
		const listaa = list.map((elemento, index) => {
			if (elemento.done === true) {
				return (
					<li className="todos" key={index}>
						{elemento.label}
						<i className="delLi fa fa-times" onClick={() => onDeleteClicked(index)} />
					</li>
				);
			}
		});
		return (
			<ul>
				{listaa}
				{taskCounter()}
			</ul>
		);
	}

	function onDeleteClicked(index) {
		setTaskList(taskList.filter((item, pos) => pos !== index));
	}

	function taskCounter() {
		const leng = taskList.length - 1;
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
				setTaskList([...taskList, { label: e.target.value, done: true }]);
			}
			e.target.value = "";
		}
	}
}
