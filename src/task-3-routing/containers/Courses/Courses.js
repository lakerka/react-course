import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Courses.css';

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    };

    selectCourse = (id, title) => {
        this.props.history.push(`/courses/${id}?title=${title}`);
    };

    render () {
        return (
            <div>
                <h1>Amazing Udemy Courses</h1>
                <section className={classes.Courses}>
                    {
                        this.state.courses.map( course => {
                            return (
                                <div
                                    className={classes.Course}
                                    key={course.id}
                                    onClick={() => { this.selectCourse(course.id, course.title) }}
                                >
                                        {course.title}
                                </div>
                            );
                        } )
                    }
                </section>
            </div>
        );
    }
}

export default withRouter(Courses);