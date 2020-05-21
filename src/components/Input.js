import React, { Component } from 'react';



class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newToDo: '',
        };
    }
    onChangeValue = (e) => {
		this.setState({
			newToDo: e.target.value,
		});
    };
    
    addToDo = (e) => {
        this.props.addToDo(this.state.newToDo);
    }

    render(){
        return(
                    <div>
                        <input type="text" id="fname" name="to do" onChange={this.onChangeValue}/>
                        <button type="submit" onClick= {this.addToDo}>Add</button>
                    </div>
        );
    }

}

export default Input;

