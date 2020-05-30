import React from 'react';
import './App.css';
import List from '../components/List';
import Input from '../components/Input';
const toDoList = [
	{ id: 1, name: 'Đi học', isDone: false },
	{ id: 2, name: 'Đi làm', isDone: false },
	{ id: 3, name: 'Ăn cơm', isDone: false },
	{ id: 4, name: 'Rửa bát', isDone: false },
];

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toDoList: toDoList,
			newToDo: '',
		};
	}
	removeItem = (id) => {
		const list = [...this.state.toDoList];
		const index = list.findIndex((el) => el.id === id);
		if(index !== -1) {
			list[index].isDone = !list[index].isDone;
			this.setState({
				toDoList: list,
			});
		};
		// list[index].isDone = !list[index].isDone;
		//list.splice(index, 1);
		// if(!!list[index].isDone) {
		// 	list[index].isDone = false;
		// }
		// else {
		// 	list[index].isDone = true;
		// }

	// 	onChangeValue = (e) => {
	// 	this.setState({
	// 		newToDo: e.target.value,
	// 	});
	// }; //list[index].isDone ? (list[index].isDone = false) : (list[index].isDone = true);

		this.setState ({toDoList: list})
	};

	

	addToDo = (todo) => {
		const newToDo = {
			id: this.state.toDoList.length + 1,
			isDone: false,
			name: todo,
		};

		const newList = [...this.state.toDoList, newToDo];
		newList.push(newToDo);


		this.setState({
			toDoList: newList,
		});
	}
	componentDidMount() {
		console.log('did mount');
	}

	static getDerivedStateFromProps(props, state) {
		return state;
	}

	// shouldComponentUpdate() {
	// 	return  false;
	// }

	

	render() {
		return (
			<div className="list-container">

				<div>
					<Input addToDo={this.addToDo}/>
				</div>
				<div>
					

					<List 
						name="To Do"
						list = {this.state.toDoList.filter((el) => el.isDone === false)}
						removeItem={this.removeItem}/>	
				</div>
				<div>
					
					<List
						name="Done"
						list = {this.state.toDoList.filter((el) => el.isDone === true)}
						removeItem={this.removeItem}/>
				</div>
		<div>Done {this.state.toDoList.filter((el) => el.isDone === true).length}/{this.state.toDoList.length}</div>

					
				
			</div>
		);
	}
}
