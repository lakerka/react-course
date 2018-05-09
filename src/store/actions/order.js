import * as actionTypes from './actionTypes';
import client from '../../config';

export const orderBurgerInit = () => ({ type: actionTypes.ORDER_BURGER_INIT });
export const orderBurgerStart = () => ({ type: actionTypes.ORDER_BURGER_START });
export const orderBurgerSuccess = (order, orderId) => ({ type: actionTypes.ORDER_BURGER_SUCCESS, order, orderId });
export const orderBurgerFail = () => ({ type: actionTypes.ORDER_BURGER_FAIL });
export const orderBurger = order => {
    return dispatch => {
        dispatch(orderBurgerStart());
        client.post('/orders.json', order)
            .then((response) => dispatch(orderBurgerSuccess(order, response.data.name)))
            .catch(() => dispatch(orderBurgerFail()));
    }
};

export const fetchOrdersStart = () => ({ type: actionTypes.FETCH_ORDERS_START });
export const fetchOrdersSuccess = (orders) => ({ type: actionTypes.FETCH_ORDERS_SUCCESS, orders });
export const fetchOrdersFail = (error) => ({ type: actionTypes.FETCH_ORDERS_FAIL, error });
export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        client.get('/orders.json')
            .then(response => {
                dispatch(fetchOrdersSuccess(response.data));
            })
            .catch(error => dispatch(fetchOrdersFail(error)));
    }
};
