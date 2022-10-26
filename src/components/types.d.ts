interface SpaceElement {
    value: number;
    initialValue: boolean;
    valueResolved: boolean;
    currentValue: number | null;
    row: number;
    column: number;
    currentError: boolean;
    pencilNumbers: number[]
}

interface RandomSudoku {
    list: spaceElement[];
    boxId: number
}

enum ROWS {
    "1" = 1, 
    "2" = 2,
    "3" = 3, 
    "4" = 4,
    "5" = 5, 
    "6" = 6, 
    "7" = 7, 
    "8" = 8, 
    "9" = 9 
}
enum COLUMNS {
    "1" = 1, 
    "2" = 2,
    "3" = 3, 
    "4" = 4,
    "5" = 5, 
    "6" = 6, 
    "7" = 7, 
    "8" = 8, 
    "9" = 9 
}
enum BOX {
    "1" = 1, 
    "2" = 2,
    "3" = 3, 
    "4" = 4,
    "5" = 5, 
    "6" = 6, 
    "7" = 7, 
    "8" = 8, 
    "9" = 9 
}
enum VALUES {
    "1" = 1, 
    "2" = 2,
    "3" = 3, 
    "4" = 4,
    "5" = 5, 
    "6" = 6, 
    "7" = 7, 
    "8" = 8, 
    "9" = 9 
}


export { RandomSudoku,SpaceElement,ROWS,COLUMNS,BOX,VALUES }