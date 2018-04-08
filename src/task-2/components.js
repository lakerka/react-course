import React from 'react';

import './components.css'


export class Task2App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    onRemove = (index) => {
        let text = this.state.text;
        text = text.slice(0, index) + text.slice(index + 1, text.length);
        this.setState({ text });
    };

    render() {
        return (
            <div>
                <div>
                    <input value={this.state.text} onChange={event => { this.setState({text: event.target.value}) }}/>
                    <Validation length={this.state.text.length}/>
                </div>
                <p>{this.state.text}</p>
                {this.state.text.split('').map((char, index) =>
                    <Char key={index} char={char} onRemove={() => { this.onRemove(index) }}/>
                )}
            </div>
        );
    }
}


function Validation(props) {
    let text = null;
    if (props.length < 5) {
        text = 'Text is too short!';
    }
    if (props.length > 7) {
        text = 'Text is too long!'
    }
    return text &&
        (<div className="validation">{text}</div>)
}


class Char extends React.Component {
    render() {
        return (
            <div className="char" onClick={this.props.onRemove}>
                {this.props.char}
            </div>
        )
    }
}