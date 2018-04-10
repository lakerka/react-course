import React from 'react';
import _ from 'lodash';

import './user-actions.css';


// eslint-disable-next-line no-unused-vars
export class Task1App extends React.Component {
    state = {
        people: [
            {username: 'Ben'},
            {username: 'Laura'},
            {username: 'Ralf'}
        ]
    };

    changeState = event => {
        const people = _.clone(this.state.people);
        people[1].username = event.target.value;
        this.setState(people);
    };

    render() {
        return (
            <div className="Task1App">
                <UserInput username={this.state.people[1].username} onChange={this.changeState} />
                {this.state.people.map(person =>
                    <UserOutput key={person.username} username={person.username} />
                )}
            </div>
        );
    }
}

export class UserInput extends React.Component {
    render() {
        return (
            <input value={this.props.username} onChange={this.props.onChange}></input>
        );
    }
}


export class UserOutput extends React.Component {
    render() {
        return (
            <div className="UserOutput">
                <p>{this.props.username}</p>
                <p></p>
            </div>
        );
    }
}


