import React, { Component } from 'react';
import './styles.css';

export default class ListItem extends Component {
	
	render() {
		const { item } = this.props;
		const isDoneClass = item.isDone ? 'isDone' : '';
		return (
			<div className={`list-item ${isDoneClass}`} onClick={this.props.onRemove}>
				<p>{this.props.item.name}</p>
			</div>
		);
	}
}
