import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    };

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={() => this.props.increment()} />
                <CounterControl label="Decrement" clicked={() => this.props.decrement()}  />
                <CounterControl label="Add 5" clicked={() => this.props.add(5)}  />
                <CounterControl label="Subtract 5" clicked={() => this.props.subtract(5)}  />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.counter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        increment: () => dispatch({ type: 'INCREMENT' }),
        decrement: () => dispatch({ type: 'DECREMENT' }),
        add: (value) => dispatch({ type: 'ADD', value }),
        subtract: (value) => dispatch({ type: 'SUBTRACT', value }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);