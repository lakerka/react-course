import _ from 'lodash';

import * as actionsTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    ordersLoading: false,
    orders: [],
    purchased: false
};

const orderReducer = (state = initialState, action) => {
    const stateClone = _.cloneDeep(state);
    switch (action.type) {
        case actionsTypes.ORDER_BURGER_INIT:
            return {
                ...stateClone,
                purchased: false,
            };
        case actionsTypes.ORDER_BURGER_START:
            return {
                ...stateClone,
                loading: true,
            };
        case actionsTypes.ORDER_BURGER_FAIL:
            return {
                ...stateClone,
                loading: false,
            };
        case actionsTypes.ORDER_BURGER_SUCCESS:
            const newOrder = action.order;
            newOrder.id = action.orderId;
            return {
                ...stateClone,
                loading: false,
                orders: stateClone.orders.concat(newOrder),
                purchased: true,
            };
        case actionsTypes.FETCH_ORDERS_START:
            return {
                ...stateClone,
                ordersLoading: true,
            };
        case actionsTypes.FETCH_ORDERS_SUCCESS:
            const orders = _.values(_.forOwn(action.orders, (value, key) => value['id'] = key ));
            return {
                ...stateClone,
                orders: orders,
                ordersLoading: false,
            };
        case actionsTypes.FETCH_ORDERS_FAIL:
            return {
                ...stateClone,
                ordersLoading: false,
            };
        default:
            return state;
    }
};

export default orderReducer;
