import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ROWS,COLUMNS,BOX,VALUES } from "../../components/types";

export interface InitialState {
    value: number | null;
    initialValue: boolean;
    valueResolved: boolean;
    currentValue: number | null;
    currentError: boolean;
    row: number | null;
    column: number | null;
    box: number | null;
    index: number | null;
    pencilNumbers: number[];
}

const initialState: InitialState = {
    value: null,
    initialValue: false,
    valueResolved: false,
    currentValue: null,
    currentError: false,
    row: null,
    column: null,
    box: null,
    index: null,
    pencilNumbers: []
}

const spaceSelected = createSlice({
    name: 'spaceSelected',
    initialState,
    reducers: {
        newSpaceSelected(state,action: PayloadAction<InitialState>) {
            state.value = action.payload.value;
            state.initialValue = action.payload.initialValue;
            state.valueResolved = action.payload.valueResolved;
            state.currentValue = action.payload.currentValue;
            state.currentError = action.payload.currentError;
            state.row = action.payload.row;
            state.column = action.payload.column;
            state.box = action.payload.box;
            state.index = action.payload.index
            state.pencilNumbers = action.payload.pencilNumbers
        }
    }
})

export const { newSpaceSelected } = spaceSelected.actions;
export default spaceSelected.reducer; 