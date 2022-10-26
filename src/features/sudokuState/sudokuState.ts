import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { randomSudokuGenerator } from "../../components/sudokuGenerator.d";
import { RandomSudoku } from "../../components/types";

interface NewState {
    valueResolved: boolean;
    currentValue: number | null;
    currentError: boolean;
    pencilNumbers: number[];
    boxId: number;
    index: number;
}
const initialState: RandomSudoku[] = randomSudokuGenerator;

const sudokuCurrentState = createSlice({
    name: 'sudokuGeneralState',
    initialState,
    reducers: {
        newGlobalSudokuState(state,action: PayloadAction<NewState>){
            state[action.payload.boxId-1].list[action.payload.index]['valueResolved'] = action.payload.valueResolved
            state[action.payload.boxId-1].list[action.payload.index]['currentValue'] = action.payload.currentValue
            state[action.payload.boxId-1].list[action.payload.index]['currentError'] = action.payload.currentError
            state[action.payload.boxId-1].list[action.payload.index]['pencilNumbers'] = action.payload.pencilNumbers
        }
    }
})

export const { newGlobalSudokuState } = sudokuCurrentState.actions;
export default sudokuCurrentState.reducer; 