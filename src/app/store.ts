import { configureStore } from "@reduxjs/toolkit";
import spaceSelectedReducer from '../features/spaceSelection/spaceSelection';
import sudokuGlobalStateReducer from '../features/sudokuState/sudokuState';
import gameData from '../features/gameData/gameData';

export const store = configureStore({
    reducer: {
        spaceSelected: spaceSelectedReducer,
        globalState: sudokuGlobalStateReducer,
        gameData: gameData
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>