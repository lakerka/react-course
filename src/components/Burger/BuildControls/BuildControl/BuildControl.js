import React from 'react';

import classes from './BuildControl.css';

class BuildControl extends React.Component {
    render() {
        return (
            <div className={classes.BuildControl}>
                <div className={classes.Label}>{this.props.label}</div>
                <button
                    className={classes.Less}
                    onClick={() => { this.props.removeIngredientHandler(this.props.type); }}
                    disabled={this.props.lessDisabled}
                >
                    Less
                </button>
                <button
                    className={classes.More}
                    onClick={() => { this.props.addIngredientHandler(this.props.type); }}
                >
                    More
                </button>
            </div>

        );
    }
}

export default BuildControl;
