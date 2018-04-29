import React, { Component } from 'react';
import _ from 'lodash';

import Order from '../../components/Order/Order';
import client from '../../config';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {
    state = {
        loading: true,
        orders: []
    };

    componentDidMount() {
        client.get('/orders.json')
            .then(response => {
                const orders = _.values(_.forOwn(response.data, (value, key) => value['id'] = key ));
                this.setState({ orders: orders, loading: false });
            })
            .catch(_ => this.setState({ loading: false }));
    }

    render() {
        const spinner = <Spinner/>;
        const orders = this.state.orders.map(order =>
            <Order
                key={order.id}
                price={order.price}
                ingredients={order.ingredients}
            />
        );
        return (
            <div>
                { this.state.loading ? spinner : orders }
            </div>
        );
    }
}

export default withErrorHandler(Orders, client);
