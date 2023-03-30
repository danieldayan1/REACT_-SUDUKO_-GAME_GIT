import { createStore } from "redux";
import SquareModel from "../Models/SquareModel";


// 1. Global State -
export class SquareState {
    public square:SquareModel = new SquareModel() ;
    public value:number = 0 ;
    public updateFlag: Boolean = false; 
}


export enum SquareActionType {
    saveSquare = "set square from board",
    saveValue = "set value from choose line",
}

//3. Action - a single object which dispatch sends to Redux for some changes:
export interface SquareAction {
    type: SquareActionType,
    payload: any;
}



//2. Reducer - a function which will be invoked when calling dispatch to perform the operation 
export function squareReducer(currentState = new SquareState(), action: SquareAction) {

    const newState = { ...currentState };

    switch (action.type) {

        case SquareActionType.saveSquare: 
            newState.square = action.payload;
            newState.updateFlag = !newState.updateFlag;
            break;
        case SquareActionType.saveValue: 
            newState.value = action.payload;
            newState.updateFlag = !newState.updateFlag;
            break;
    }

    return newState;
}

//5. Store - manager object from redux which handles the entire operations: (dispatch, getState, subscribe)
export const squareStore = createStore(squareReducer);