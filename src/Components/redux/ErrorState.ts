export class ErrorsState {
    public error404: boolean = false;
    public wrongDetails: boolean = false;

}

export enum ErrorsActionType {
    Error404 = "Error404",
    wrongDetails = "wrongDetails"
}

export interface ErrorsAction {
    type: ErrorsActionType,
    payload?: any,
}

export function error404Action(error404: boolean): ErrorsAction {
    return { type: ErrorsActionType.Error404, payload: error404 }
}

export function wrongDetailsAction(wrongDetails: boolean): ErrorsAction {
    return { type: ErrorsActionType.wrongDetails, payload: wrongDetails }
}

export function errorsReducer(currentState: ErrorsState = new ErrorsState(), action: ErrorsAction): ErrorsState {
    const newState = { ...currentState };

    switch (action.type) {
        case ErrorsActionType.Error404:
            newState.error404 = action.payload;
            console.log(newState.error404);
            break;
        case ErrorsActionType.wrongDetails:
            newState.wrongDetails = action.payload;
            console.log(newState.wrongDetails);
            break;
    }

    return newState;
}


