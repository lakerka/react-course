import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, client) => {
    return class extends Component {
        state = {
            show: false,
            error: null
        };

        componentDidMount() {
            client.interceptors.request.use(request => {
                this.setState({ show: false, error: null });
                return request;
            });
            client.interceptors.response.use(res => res, error => {
                this.setState({ show: true, error: error.toString() });
                return error;
            });
        }

        modalCloseHandler = () => this.setState({ show: false});

        render() {
            return (
                <Fragment>
                    <Modal
                        show={this.state.show}
                        modalClosedHandler={this.modalCloseHandler}
                    >
                        {this.state.error}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    };
};

export default withErrorHandler;
