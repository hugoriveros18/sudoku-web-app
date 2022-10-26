import { RandomSudoku, ROWS, COLUMNS } from "./types.d"
import { makepuzzle, solvepuzzle, ratepuzzle } from 'sudoku'

const randomSudokuGenerator: RandomSudoku[] = [
    // BOX-1
    {list: [
        {value: 9,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[1],column: COLUMNS[1],currentError: false, pencilNumbers: []},
        {value: 6,initialValue: true,valueResolved: true,currentValue: 6,row: ROWS[1],column: COLUMNS[2],currentError: false, pencilNumbers: []},
        {value: 1,initialValue: true,valueResolved: true,currentValue: 1,row: ROWS[1],column: COLUMNS[3],currentError: false, pencilNumbers: []},
        {value: 7,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[2],column: COLUMNS[1],currentError: false, pencilNumbers: []},
        {value: 8,initialValue: true,valueResolved: true,currentValue: 8,row: ROWS[2],column: COLUMNS[2],currentError: false, pencilNumbers: []},
        {value: 3,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[2],column: COLUMNS[3],currentError: false, pencilNumbers: []},
        {value: 5,initialValue: true,valueResolved: true,currentValue: 5,row: ROWS[3],column: COLUMNS[1],currentError: false, pencilNumbers: []},
        {value: 2,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[3],column: COLUMNS[2],currentError: false, pencilNumbers: []},
        {value: 4,initialValue: true,valueResolved: true,currentValue: 4,row: ROWS[3],column: COLUMNS[3],currentError: false, pencilNumbers: []},
    ], boxId: 1},
    // BOX-2
    {list: [
        {value: 4,initialValue: true,valueResolved: true,currentValue: 4,row: ROWS[1],column: COLUMNS[4],currentError: false, pencilNumbers: []},
        {value: 5,initialValue: true,valueResolved: true,currentValue: 5,row: ROWS[1],column: COLUMNS[5],currentError: false, pencilNumbers: []},
        {value: 7,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[1],column: COLUMNS[6],currentError: false, pencilNumbers: []},
        {value: 9,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[2],column: COLUMNS[4],currentError: false, pencilNumbers: []},
        {value: 2,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[2],column: COLUMNS[5],currentError: false, pencilNumbers: []},
        {value: 1,initialValue: true,valueResolved: true,currentValue: 1,row: ROWS[2],column: COLUMNS[6],currentError: false, pencilNumbers: []},
        {value: 3,initialValue: true,valueResolved: true,currentValue: 3,row: ROWS[3],column: COLUMNS[4],currentError: false, pencilNumbers: []},
        {value: 8,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[3],column: COLUMNS[5],currentError: false, pencilNumbers: []},
        {value: 6,initialValue: true,valueResolved: true,currentValue: 6,row: ROWS[3],column: COLUMNS[6],currentError: false, pencilNumbers: []},
    ], boxId: 2},
    // BOX-3
    {list: [
        {value: 2,initialValue: true,valueResolved: true,currentValue: 2,row: ROWS[1],column: COLUMNS[7],currentError: false, pencilNumbers: []},
        {value: 8,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[1],column: COLUMNS[8],currentError: false, pencilNumbers: []},
        {value: 3,initialValue: true,valueResolved: true,currentValue: 3,row: ROWS[1],column: COLUMNS[9],currentError: false, pencilNumbers: []},
        {value: 4,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[2],column: COLUMNS[7],currentError: false, pencilNumbers: []},
        {value: 6,initialValue: true,valueResolved: true,currentValue: 6,row: ROWS[2],column: COLUMNS[8],currentError: false, pencilNumbers: []},
        {value: 5,initialValue: true,valueResolved: true,currentValue: 5,row: ROWS[2],column: COLUMNS[9],currentError: false, pencilNumbers: []},
        {value: 9,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[3],column: COLUMNS[7],currentError: false, pencilNumbers: []},
        {value: 1,initialValue: true,valueResolved: true,currentValue: 1,row: ROWS[3],column: COLUMNS[8],currentError: false, pencilNumbers: []},
        {value: 7,initialValue: true,valueResolved: true,currentValue: 7,row: ROWS[3],column: COLUMNS[9],currentError: false, pencilNumbers: []},
    ], boxId: 3},
    // BOX-4
    {list: [
        {value: 8,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[4],column: COLUMNS[1],currentError: false, pencilNumbers: []},
        {value: 9,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[4],column: COLUMNS[2],currentError: false, pencilNumbers: []},
        {value: 2,initialValue: true,valueResolved: true,currentValue: 2,row: ROWS[4],column: COLUMNS[3],currentError: false, pencilNumbers: []},
        {value: 1,initialValue: true,valueResolved: true,currentValue: 1,row: ROWS[5],column: COLUMNS[1],currentError: false, pencilNumbers: []},
        {value: 3,initialValue: true,valueResolved: true,currentValue: 3,row: ROWS[5],column: COLUMNS[2],currentError: false, pencilNumbers: []},
        {value: 5,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[5],column: COLUMNS[3],currentError: false, pencilNumbers: []},
        {value: 6,initialValue: true,valueResolved: true,currentValue: 6,row: ROWS[6],column: COLUMNS[1],currentError: false, pencilNumbers: []},
        {value: 4,initialValue: true,valueResolved: true,currentValue: 4,row: ROWS[6],column: COLUMNS[2],currentError: false, pencilNumbers: []},
        {value: 7,initialValue: true,valueResolved: true,currentValue: 7,row: ROWS[6],column: COLUMNS[3],currentError: false, pencilNumbers: []},
    ], boxId: 4},
    // BOX-5
    {list: [
        {value: 5,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[4],column: COLUMNS[4],currentError: false, pencilNumbers: []},
        {value: 4,initialValue: true,valueResolved: true,currentValue: 4,row: ROWS[4],column: COLUMNS[5],currentError: false, pencilNumbers: []},
        {value: 3,initialValue: true,valueResolved: true,currentValue: 3,row: ROWS[4],column: COLUMNS[6],currentError: false, pencilNumbers: []},
        {value: 7,initialValue: true,valueResolved: true,currentValue: 7,row: ROWS[5],column: COLUMNS[4],currentError: false, pencilNumbers: []},
        {value: 6,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[5],column: COLUMNS[5],currentError: false, pencilNumbers: []},
        {value: 2,initialValue: true,valueResolved: true,currentValue: 2,row: ROWS[5],column: COLUMNS[6],currentError: false, pencilNumbers: []},
        {value: 8,initialValue: true,valueResolved: true,currentValue: 8,row: ROWS[6],column: COLUMNS[4],currentError: false, pencilNumbers: []},
        {value: 1,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[6],column: COLUMNS[5],currentError: false, pencilNumbers: []},
        {value: 9,initialValue: true,valueResolved: true,currentValue: 9,row: ROWS[6],column: COLUMNS[6],currentError: false, pencilNumbers: []},
    ], boxId: 5},
    // BOX-6
    {list: [
        {value: 6,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[4],column: COLUMNS[7],currentError: false, pencilNumbers: []},
        {value: 7,initialValue: true,valueResolved: true,currentValue: 7,row: ROWS[4],column: COLUMNS[8],currentError: false, pencilNumbers: []},
        {value: 1,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[4],column: COLUMNS[9],currentError: false, pencilNumbers: []},
        {value: 8,initialValue: true,valueResolved: true,currentValue: 8,row: ROWS[5],column: COLUMNS[7],currentError: false, pencilNumbers: []},
        {value: 9,initialValue: true,valueResolved: true,currentValue: 9,row: ROWS[5],column: COLUMNS[8],currentError: false, pencilNumbers: []},
        {value: 4,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[5],column: COLUMNS[9],currentError: false, pencilNumbers: []},
        {value: 3,initialValue: true,valueResolved: true,currentValue: 3,row: ROWS[6],column: COLUMNS[7],currentError: false, pencilNumbers: []},
        {value: 5,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[6],column: COLUMNS[8],currentError: false, pencilNumbers: []},
        {value: 2,initialValue: true,valueResolved: true,currentValue: 2,row: ROWS[6],column: COLUMNS[9],currentError: false, pencilNumbers: []},
    ], boxId: 6},
    // BOX-7
    {list: [
        {value: 2,initialValue: true,valueResolved: true,currentValue: 2,row: ROWS[7],column: COLUMNS[1],currentError: false, pencilNumbers: []},
        {value: 7,initialValue: true,valueResolved: true,currentValue: 7,row: ROWS[7],column: COLUMNS[2],currentError: false, pencilNumbers: []},
        {value: 8,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[7],column: COLUMNS[3],currentError: false, pencilNumbers: []},
        {value: 4,initialValue: true,valueResolved: true,currentValue: 4,row: ROWS[8],column: COLUMNS[1],currentError: false, pencilNumbers: []},
        {value: 1,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[8],column: COLUMNS[2],currentError: false, pencilNumbers: []},
        {value: 9,initialValue: true,valueResolved: true,currentValue: 9,row: ROWS[8],column: COLUMNS[3],currentError: false, pencilNumbers: []},
        {value: 3,initialValue: true,valueResolved: true,currentValue: 3,row: ROWS[9],column: COLUMNS[1],currentError: false, pencilNumbers: []},
        {value: 5,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[9],column: COLUMNS[2],currentError: false, pencilNumbers: []},
        {value: 6,initialValue: true,valueResolved: true,currentValue: 6,row: ROWS[9],column: COLUMNS[3],currentError: false, pencilNumbers: []},
    ], boxId: 7},
    // BOX-8
    {list: [
        {value: 1,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[7],column: COLUMNS[4],currentError: false, pencilNumbers: []},
        {value: 9,initialValue: true,valueResolved: true,currentValue: 9,row: ROWS[7],column: COLUMNS[5],currentError: false, pencilNumbers: []},
        {value: 4,initialValue: true,valueResolved: true,currentValue: 4,row: ROWS[7],column: COLUMNS[6],currentError: false, pencilNumbers: []},
        {value: 6,initialValue: true,valueResolved: true,currentValue: 6,row: ROWS[8],column: COLUMNS[4],currentError: false, pencilNumbers: []},
        {value: 3,initialValue: true,valueResolved: true,currentValue: 3,row: ROWS[8],column: COLUMNS[5],currentError: false, pencilNumbers: []},
        {value: 5,initialValue: true,valueResolved: true,currentValue: 5,row: ROWS[8],column: COLUMNS[6],currentError: false, pencilNumbers: []},
        {value: 2,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[9],column: COLUMNS[4],currentError: false, pencilNumbers: []},
        {value: 7,initialValue: true,valueResolved: true,currentValue: 7,row: ROWS[9],column: COLUMNS[5],currentError: false, pencilNumbers: []},
        {value: 8,initialValue: true,valueResolved: true,currentValue: 8,row: ROWS[9],column: COLUMNS[6],currentError: false, pencilNumbers: []},
    ], boxId: 8},
    // BOX-9
    {list: [
        {value: 5,initialValue: true,valueResolved: true,currentValue: 5,row: ROWS[7],column: COLUMNS[7],currentError: false, pencilNumbers: []},
        {value: 3,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[7],column: COLUMNS[8],currentError: false, pencilNumbers: []},
        {value: 6,initialValue: true,valueResolved: true,currentValue: 6,row: ROWS[7],column: COLUMNS[9],currentError: false, pencilNumbers: []},
        {value: 7,initialValue: true,valueResolved: true,currentValue: 7,row: ROWS[8],column: COLUMNS[7],currentError: false, pencilNumbers: []},
        {value: 2,initialValue: false,valueResolved: false,currentValue: null,row: ROWS[8],column: COLUMNS[8],currentError: false, pencilNumbers: []},
        {value: 8,initialValue: true,valueResolved: true,currentValue: 8,row: ROWS[8],column: COLUMNS[9],currentError: false, pencilNumbers: []},
        {value: 1,initialValue: true,valueResolved: true,currentValue: 1,row: ROWS[9],column: COLUMNS[7],currentError: false, pencilNumbers: []},
        {value: 4,initialValue: true,valueResolved: true,currentValue: 4,row: ROWS[9],column: COLUMNS[8],currentError: false, pencilNumbers: []},
        {value: 9,initialValue: true,valueResolved: true,currentValue: 9,row: ROWS[9],column: COLUMNS[9],currentError: false, pencilNumbers: []},
    ], boxId: 9},
    
]

// const prueba = makepuzzle()
// const solucion = solvepuzzle(prueba)
// const dificultad = ratepuzzle(prueba,1)

export { randomSudokuGenerator }