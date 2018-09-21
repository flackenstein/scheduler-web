import * as ApiData from "../helpers/ApiData";
import endpoints from "./endpoints";

export const userApi = {
    login,
    logout
};

async function login(username, password) {
    try {
        const params = { username, password };
        const result = await ApiData.Post(endpoints.login, params);

        if (result && result.success) {
            const user = result.data;
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        } else {
            throw("Username or Password incorrect.  Please try again");
        }

    } catch (error) {
        return Promise.reject(error);
    }
}

export function logout() {
    // remove user from local storage to log user out
    //localStorage.removeItem('user');
    localStorage.clear();
}
