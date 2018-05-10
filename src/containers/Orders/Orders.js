import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import client from '../../config';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


class Orders extends Component {
    componentDidMount() {
        const { token, userId } = this.props;
        this.props.fetchOrders(token, userId);
    }

    render() {
        const spinner = <Spinner/>;
        const orders = this.props.orders.map(order =>
            <Order
                key={order.id}
                price={order.price}
                ingredients={order.ingredients}
            />
        );
        return (
            <div>
                { this.props.loading ? spinner : orders }
            </div>
        );
    }
}

const mapStateToProps = ({ order, auth }) => ({
    orders: order.orders,
    loading: order.ordersLoading,
    token: auth.token,
    userId: auth.userId,
});

const mapDispatchToProps = dispatch => ({
    fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, client));
