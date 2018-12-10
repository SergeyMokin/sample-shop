import Constants from '../constants';

const API_URL = `http://localhost:63027/`;
//let path = API_URL + `account/register?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
class StatusException {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}

function CreateException(status, messageBadRequst = null) {
    if (status === 400) {
        return new StatusException(status, messageBadRequst === null ? 'Bad request.' : messageBadRequst);
    }
    if (status === 401) {
        return new StatusException(status, 'Not logined. ');
    }
    if (status === 403) {
        return new StatusException(status, 'Unauthorized access. ');
    }
    if (status === 404) {
        return new StatusException(status, 'Not found. ');
    }
    if (status === 422) {
        return new StatusException(status, 'Invalid params. ');
    }
    if (status === 500) {
        return new StatusException(status, 'Server exception. ');
    }
}

function ResponseHandler(response, badReqMes = null) {
    if (response.status === 200 || response.status === 201 || response.status === 204) {
        return response.json();
    }
    else {
        return CreateException(response.status, badReqMes);
    }
}

export default class Api {
    constructor(value = null) {
        if(value === null){
            value = JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_TOKEN));
        }
        this.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: value === null ? '' : value
        }
    }

    setAuthorizationHeader(value = '') {
        this.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: value
        }
    }

    async register(user) {
        let method = `POST`;
        let path = API_URL + `user/register`;
        let body = JSON.stringify(user);

        let response = await fetch(
            path,
            {
                method: method,
                headers: this.headers,
                body: body
            }
        );

        return ResponseHandler(response, 'User exists. ');
    }

    async login(creds) {
        let method = `POST`;
        let path = API_URL + `user/login`;
        let body = JSON.stringify(creds);

        let response = await fetch(
            path,
            {
                method: method,
                headers: this.headers,
                body: body
            }
        );

        return ResponseHandler(response, 'Incorrect login or password. ');
    }

    async logout(){
        let method = `POST`;
        let path = API_URL + `user/logout`;

        let response = await fetch(
            path,
            {
                method: method,
                headers: this.headers
            }
        )

        return ResponseHandler(response);
    }

    async getUsers(){
        let method = `GET`;
        let path = API_URL + `user/getall`;

        let response = await fetch(
            path,
            {
                method: method,
                headers: this.headers
            }
        );

        return ResponseHandler(response, 'Can not get any user.');
    }

    async editUser(user){
        let method = `PUT`;
        let path = API_URL + `user/update`;
        let body = JSON.stringify(user);

        let response = await fetch(
            path,
            {
                method: method,
                headers: this.headers,
                body: body
            }
        );

        return ResponseHandler(response, 'Can not edit user.');
    }

    async deleteUser(id){
        let method = `DELETE`;
        let path = API_URL + `user/delete/${encodeURIComponent(id)}`;

        let response = await fetch(
            path,
            {
                method: method,
                headers: this.headers
            }
        );

        return ResponseHandler(response, 'Can not delete user.');
    }
    
    async getPurchases(){
        let method = `GET`;
        let path = API_URL + `purchase/getall`;
        let response = await fetch(
            path,
            {
                method: method,
                headers: this.headers
            }
        );

        return ResponseHandler(response, 'Can not get any purchase.');
    }

    async editPurchase(purchase){
        let method = `PUT`;
        let path = API_URL + `purchase/update`;
        let body = JSON.stringify(purchase);

        let response = await fetch(
            path,
            {
                method: method,
                headers: this.headers,
                body: body
            }
        );

        return ResponseHandler(response, 'Can not update purchase.');
    }

    async addPurchase(purchase){
        let method = `POST`;
        let path = API_URL + `purchase/add`;
        let body = JSON.stringify(purchase);

        let response = await fetch(
            path,
            {
                method: method,
                headers: this.headers,
                body: body
            }
        );

        return ResponseHandler(response, 'Can not add purchase.');
    }

    async deletePurchase(id){
        let method = `DELETE`;
        let path = API_URL + `purchase/delete/${encodeURIComponent(id)}`;

        let response = await fetch(
            path,
            {
                method: method,
                headers: this.headers
            }
        );

        return ResponseHandler(response, 'Can not delete purchase.');
    }

    async addToBasket(obj){
        let method = `POST`;
        let path = API_URL + `shopping-basket`;
        let body = obj.length ? JSON.stringify(obj) : JSON.stringify([obj]);

        let response = await fetch(
            path,
            {
                method: method,
                headers: this.headers,
                body: body
            }
        );

        return ResponseHandler(response);
    }

    async deleteFromBasket(id){
        let method = `DELETE`;
        let path = API_URL + `shopping-basket/${encodeURIComponent(id)}`;

        let response = await fetch(
            path,
            {
                method: method,
                headers: this.headers
            }
        );

        return ResponseHandler(response, 'Can not delete this item.');
    }

    async clearBasket(){
        let method = `POST`;
        let path = API_URL + `shopping-basket/clear`;

        let response = await fetch(
            path,
            {
                method: method,
                headers: this.headers
            }
        );

        return ResponseHandler(response, 'Can not clear basket.');
    }

    async getBasket(){
        let method = `GET`;
        let path = API_URL + `shopping-basket`;

        let response = await fetch(
            path,
            {
                method: method,
                headers: this.headers
            }
        );

        return ResponseHandler(response, 'Can not get basket of this user.');
    }

    async buy(){
        let method = `POST`;
        let path = API_URL + `shop/buy`;

        let response = await fetch(
            path,
            {
                method: method,
                headers: this.headers
            }
        );

        return ResponseHandler(response, 'Wrong email address.');
    }
}