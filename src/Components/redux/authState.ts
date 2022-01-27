import jwtDecode from "jwt-decode";
import UserDetails from "../model/userDetails";


export class AuthState {
    public userDetails: UserDetails = new UserDetails();
}

export enum AuthActionType {
    userDetails = "userDetails",
    LogoutUser = "LogoutUser",
    loginUser = "loginUser",
    UpdateToken = "UpdateToken",
}

export interface AuthAction {
    type: AuthActionType,
    payload?: any,
}

export function userDetails(user: UserDetails): AuthAction {
    return { type: AuthActionType.userDetails, payload: user }
}

export function logoutUser(): AuthAction {
    return { type: AuthActionType.LogoutUser, payload: null }
}

export function loginUser(token: string): AuthAction {
    return { type: AuthActionType.loginUser, payload: token }
}

export function updateToken(token: string): AuthAction {
    return { type: AuthActionType.UpdateToken, payload: token }
}

export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };
    switch (action.type) {
        case AuthActionType.userDetails:
            newState.userDetails = action.payload;
            localStorage.setItem("token", action.payload);
            break;
        case AuthActionType.LogoutUser:
            newState.userDetails = new UserDetails();
            localStorage.removeItem("token");
            break;
        case AuthActionType.loginUser:
            newState.userDetails.token = action.payload;
            const decoded: UserDetails = jwtDecode(newState.userDetails.token);
            newState.userDetails.clientType = decoded.clientType;
            newState.userDetails.id = decoded.id;
            console.log("-------------------------------");
            console.log(decoded);
            console.log(newState.userDetails.clientType)
            console.log(newState.userDetails.id)
            console.log("-------------------------------");
            break;

        case AuthActionType.UpdateToken:
            newState.userDetails.token = action.payload;
            localStorage.setItem("token", action.payload);
            break;
    }

    return newState;
}




