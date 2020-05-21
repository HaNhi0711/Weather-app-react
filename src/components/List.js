import React, { Component } from 'react';
import ListItem from './ListItem';
import './styles.css';
export default class List extends Component {
	// renderList = () => {
	// 	return this.props.list.map((el, index) => {
	// 		return <ListItem key={index} job={el.name} />;
	// 	});
	// };

	render() {
		return (
			<div className='list'>
				<h1>{this.props.name}</h1>
				{this.props.list.map((el, index) => {
					return <ListItem key={index} item={el}
					onRemove={() => this.props.removeItem(el.id)} />;
				})}
				{/* {this.renderList()} */}
			</div>
		);
	}
}
