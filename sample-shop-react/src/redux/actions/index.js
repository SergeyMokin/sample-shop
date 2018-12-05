import ActionTypes from './action-types';

export function addToBasket(purchase) {
    return { type: ActionTypes.ADD_TO_BASKET, purchase };
}

export function deleteFromBasket(id) {
    return { type: ActionTypes.DELETE_FROM_BASKET, id };
}

export function clearUserBasket() {
    return { type: ActionTypes.CLEAR_USER_BASKET };
}

export function setBasket(basket) {
    return { type: ActionTypes.SET_BASKET, basket };
}