import { combineReducers } from 'redux';
import ActionTypes from '../actions/action-types';
import Api from '../../api';

const initialState = [];

function reduce(state = initialState, action) {
    let api = new Api();

    switch (action.type) {
        case ActionTypes.ADD_TO_BASKET: {
            api.addToBasket(action.purchase);
            return [...state, action.purchase]
        }
        case ActionTypes.CLEAR_USER_BASKET: {
            api.clearBasket();
            return [];
        }
        case ActionTypes.DELETE_FROM_BASKET: {
            api.deleteFromBasket(action.id);
            return state.filter(x => x._id !== action.id)
        }
        case ActionTypes.SET_BASKET: {
            return [...action.basket.purchases];
        }
        default: return state;
    }
}

export default combineReducers({ reduce });