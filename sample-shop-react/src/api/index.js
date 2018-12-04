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
        return new StatusException(status, messageBadRequst);
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
    constructor(value = '') {
        this.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: value
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

    async getPurchases(){
        let method = `GET`;
        let path = API_URL + `purchase/getall`

        let response = await fetch(
            path,
            {
                method: method,
                headers: this.headers
            }
        );

        return ResponseHandler(response);
    }
}