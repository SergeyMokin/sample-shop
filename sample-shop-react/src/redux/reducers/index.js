import { combineReducers } from 'redux';
import ActionTypes from '../actions/action-types';

const initialState = [];

function reduce(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.ADD_TO_BASKET: {
            return [...state, action.purchase]
        }
        case ActionTypes.CLEAR_USER_BASKET: {
            return [];
        }
        case ActionTypes.DELETE_FROM_BASKET: {
            return state.filter(x => x._id !== action.id)
        }
        default: return state;
    }
}

export default combineReducers({ reduce });