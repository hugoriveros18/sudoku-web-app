import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { randomSudokuGenerator } from "../../components/sudokuGenerator.d";

interface GameHistory {
    valueResolved: boolean;
    currentValue: number | null;
    currentError: boolean;
    pencilNumbers: number[];
    box: number;
    index: number;
    row: number;
    column: number;
    score: number;
    remainingNumbers: {
        [key:number]: number;
    };
    valuesResume: {
        box: {
            [key:number]: number[],
        },
        row: {
            [key:number]: number[],
        },
        column: {
            [key:number]: number[],
        },
    };
    addValue: boolean;
}

interface GameData {
    remainingNumbers: {
        [key:number]: number;
    };
    mistakes: number;
    score: number;
    difficulty: string;
    gameover: boolean;
    time: {
        value: number;
        isActive: boolean;
        isPaused: boolean
    };
    pencil: {
        isActive: boolean;
        currentPencilNumber: {
            'number': number;
            'box': number;
            'row': number;
            'column': number;
            'counter': number;
        };
    };
    valuesResume: {
        box: {
            [key:number]: number[],
        },
        row: {
            [key:number]: number[],
        },
        column: {
            [key:number]: number[],
        },
    };
    gameHistory: GameHistory[];
}

const initialState: GameData = {
    remainingNumbers: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0
    },
    mistakes: 0,
    score: 0,
    difficulty: 'Easy',
    gameover: false,
    time: {
        value: 0,
        isActive: true,
        isPaused: false
    },
    pencil: {
        isActive: false,
        currentPencilNumber:{
            'number': 0,
            'box': 0,
            'row': 0,
            'column': 0,
            'counter': 0
        }
    },
    valuesResume: {
        box: {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
        },
        row: {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
        },
        column: {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
        },
    },
    gameHistory: []
};

randomSudokuGenerator.forEach((box) => {
    box.list.forEach((space) => {
        if(!space.initialValue){
            initialState.remainingNumbers[space.value]++;
        }
    })
});

randomSudokuGenerator.forEach(box => {
    const boxId = box.boxId
    box.list.forEach(space => {
        if(space.currentValue != null){
            initialState.valuesResume.box[boxId].push(space.currentValue);
            initialState.valuesResume.row[space.row].push(space.currentValue);
            initialState.valuesResume.column[space.column].push(space.currentValue);
        }
    });
});

const remainingNumbers = createSlice({
    name: 'gameData',
    initialState,
    reducers: {
        decreaseRemaining(state, action: PayloadAction<number>) {
            state.remainingNumbers[action.payload]--
        },
        increaseMistakes(state) {
            state.mistakes++;
            if(state.mistakes === 3){
                state.gameover = true
            }
        },
        activeTimer(state,action: PayloadAction<boolean>) {
            state.time.isActive = action.payload
        },
        pauseTimer(state,action: PayloadAction<boolean>) {
            state.time.isPaused = action.payload
        },
        updateTimer(state) {
            state.time.value++;
        },
        resetTimer(state) {
            state.time.value = 0;
        },
        increaseScore(state, action: PayloadAction<number>) {
            state.score += action.payload;
        },
        changePencilState(state) {
            state.pencil.isActive = !state.pencil.isActive;
        },
        addResumeValue(state, action: PayloadAction<number[]>) {
            state.valuesResume.box[action.payload[1]].push(action.payload[0])
            state.valuesResume.row[action.payload[2]].push(action.payload[0])
            state.valuesResume.column[action.payload[3]].push(action.payload[0])
        },
        newCurrentPencilValue(state,action: PayloadAction<number[]>){
            state.pencil.currentPencilNumber['number'] = action.payload[0];
            state.pencil.currentPencilNumber['box'] = action.payload[1];
            state.pencil.currentPencilNumber['row'] = action.payload[2];
            state.pencil.currentPencilNumber['column'] = action.payload[3];
            state.pencil.currentPencilNumber['counter']++;
        },
        updateGameHistory(state,action: PayloadAction<GameHistory>){
            let record = {...action.payload}
            if(action.payload.addValue){
                record['valuesResume'] = state.valuesResume;
                record['score'] = state.score;
                record['remainingNumbers'] = state.remainingNumbers
            }
            state.gameHistory = [...state.gameHistory,record];
        },
        undoGameHistory(state,action: PayloadAction<GameHistory[]>) {
            if(action.payload.length === 0){
                state.score = 0;
                state.remainingNumbers = initialState.remainingNumbers;
                state.gameHistory = action.payload;
                state.valuesResume = initialState.valuesResume
            } else {
                state.gameHistory = action.payload;
                state.score = action.payload[action.payload.length-1].score;
                state.remainingNumbers = action.payload[action.payload.length-1].remainingNumbers;
                state.valuesResume = action.payload[action.payload.length-1].valuesResume;
            }
        }
    }
})

export const { 
    decreaseRemaining,
    increaseMistakes,
    activeTimer,
    pauseTimer,
    updateTimer,
    resetTimer,
    increaseScore,
    changePencilState,
    addResumeValue,
    newCurrentPencilValue,
    updateGameHistory,
    undoGameHistory
} = remainingNumbers.actions;

export default remainingNumbers.reducer;