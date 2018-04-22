import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, client) => {
    return class extends Component {
        state = {
            show: false,
            error: null
        };

        componentWillMount() {
            this.requestInterceptor = client.interceptors.request.use(request => {
                this.setState({ show: false, error: null });
                return request;
            });
            this.responseInterceptor = client.interceptors.response.use(res => res, error => {
                this.setState({ show: true, error: error.toString() });
                // return error;
            });
        }

        componentWillUnmount() {
            client.interceptors.request.eject(this.requestInterceptor);
            client.interceptors.request.eject(this.responseInterceptor);
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
