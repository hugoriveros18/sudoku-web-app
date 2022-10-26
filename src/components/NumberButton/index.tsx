import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { newGlobalSudokuState } from "../../features/sudokuState/sudokuState";
import { decreaseRemaining,increaseMistakes,increaseScore,addResumeValue,newCurrentPencilValue,updateGameHistory } from "../../features/gameData/gameData";
import { newSpaceSelected } from "../../features/spaceSelection/spaceSelection";

interface NumberButtonProps {
    number: number;
}

function NumberButton({number}: NumberButtonProps) {

    // GLOBAL STATE
    const dispatch = useAppDispatch();
    //CURRENT GLOBAL SPACE SELECTED
    const globalSpaceSelected = useAppSelector((state) => {
        return {
            value: state.spaceSelected.value,
            initialValue: state.spaceSelected.initialValue,
            valueResolved: state.spaceSelected.valueResolved,
            currentValue: state.spaceSelected.currentValue,
            currentError: state.spaceSelected.currentError,
            row: state.spaceSelected.row,
            column: state.spaceSelected.column,
            box: state.spaceSelected.box,
            index: state.spaceSelected.index,
            pencilNumbers: state.spaceSelected.pencilNumbers
        }
    })
    //GLOBAL REMAINING NUMBERS
    const remainingNumbers = useAppSelector((state) => {
        return state.gameData.remainingNumbers;
    })
    //PENCIL GLOBAL STATE
    const pencilGlobalState = useAppSelector((state) => {
        return state.gameData.pencil.isActive
    })
    //GLOBAL VALUES RESUME: BOX, ROW, COLUMN
    const globalValuesResume = useAppSelector((state) => {
        return state.gameData.valuesResume
    })
    //GAME SCORE
    const globalScore = useAppSelector((state) => {
        return state.gameData.score;
    })


    //RENDER METHODS
    const findRemainingNumbers = (): number => {
        let remaining = 0;
        switch(number) {
            case 1:
                remaining = remainingNumbers[1];
                break;
            case 2:
                remaining = remainingNumbers[2];
                break;
            case 3:
                remaining = remainingNumbers[3];
                break;
            case 4:
                remaining = remainingNumbers[4];
                break;
            case 5:
                remaining = remainingNumbers[5];
                break;
            case 6:
                remaining = remainingNumbers[6];
                break;
            case 7:
                remaining = remainingNumbers[7];
                break;
            case 8:
                remaining = remainingNumbers[8];
                break;
            case 9:
                remaining = remainingNumbers[9];
                break;
        }
        return remaining
    }


    //METHODS
    const handleAddNewValue = () => {
        if(globalSpaceSelected.value != null){ //Will avoid to do some action when no space is selected(mainly at the beginnig of the game)
            if(!globalSpaceSelected.initialValue && globalSpaceSelected.box != null && globalSpaceSelected.index != null){ //We make sure that the space selected by the user is not an space provided by the game from the beginning, so it can be edited.
                if(!pencilGlobalState){ //PENCIL NOT ACTIVE
                    if(globalSpaceSelected.value === number){ //We dispatch an action when the space value match succesfully with the number of the buttom selected by the user
                        if(!globalSpaceSelected.valueResolved){
                            dispatch(newGlobalSudokuState({
                                valueResolved: true,
                                currentValue: number,
                                currentError: false,
                                boxId: globalSpaceSelected.box,
                                index: globalSpaceSelected.index,
                                pencilNumbers: []
                            }));
                            dispatch(newSpaceSelected({
                                value: number,
                                initialValue: false,
                                valueResolved: true,
                                currentValue: number,
                                currentError: false,
                                row: globalSpaceSelected.row,
                                column: globalSpaceSelected.column,
                                box: globalSpaceSelected.box,
                                index: globalSpaceSelected.index,
                                pencilNumbers: []
                            }));
                            dispatch(decreaseRemaining(number))
                            dispatch(increaseScore(500))
                            if(globalSpaceSelected.row != null && globalSpaceSelected.column != null){
                                dispatch(addResumeValue([number,globalSpaceSelected.box,globalSpaceSelected.row,globalSpaceSelected.column]))
                                dispatch(updateGameHistory({
                                    valueResolved: true,
                                    currentValue: number,
                                    currentError: false,
                                    pencilNumbers: [],
                                    box: globalSpaceSelected.box,
                                    index: globalSpaceSelected.index,
                                    row: globalSpaceSelected.row,
                                    column: globalSpaceSelected.column,
                                    score: globalScore,
                                    remainingNumbers: remainingNumbers,
                                    valuesResume: globalValuesResume,
                                    addValue: true 
                                }))
                            }
                        }
                    } else {
                        if(!globalSpaceSelected.valueResolved){
                            dispatch(newGlobalSudokuState({
                                valueResolved: false,
                                currentValue: number,
                                currentError: true,
                                boxId: globalSpaceSelected.box,
                                index: globalSpaceSelected.index,
                                pencilNumbers: globalSpaceSelected.pencilNumbers
                            }));
                            dispatch(newSpaceSelected({
                                value: globalSpaceSelected.value,
                                initialValue: false,
                                valueResolved: false,
                                currentValue: number,
                                currentError: true,
                                row: globalSpaceSelected.row,
                                column: globalSpaceSelected.column,
                                box: globalSpaceSelected.box,
                                index: globalSpaceSelected.index,
                                pencilNumbers: globalSpaceSelected.pencilNumbers
                            }));
                            dispatch(increaseMistakes());
                            if(globalSpaceSelected.row != null && globalSpaceSelected.column != null){
                                dispatch(updateGameHistory({
                                    valueResolved: false,
                                    currentValue: number,
                                    currentError: true,
                                    pencilNumbers: [],
                                    box: globalSpaceSelected.box,
                                    index: globalSpaceSelected.index,
                                    row: globalSpaceSelected.row,
                                    column: globalSpaceSelected.column,
                                    score: globalScore,
                                    remainingNumbers: remainingNumbers,
                                    valuesResume: globalValuesResume,
                                    addValue: false 
                                }))
                            }
                        }
                    }
                } else { //PENCIL ACTIVE
                    if(!globalSpaceSelected.valueResolved){ //pencil only will take action if the value of the current space is not resolved
                        if(!globalSpaceSelected.pencilNumbers.includes(number)){ //we validate that the current global space selected does not have the button number in the pencil numbers attribute
                            if(!globalValuesResume.box[globalSpaceSelected.box].includes(number) && globalSpaceSelected.row != null && !globalValuesResume.row[globalSpaceSelected.row].includes(number) && globalSpaceSelected.column != null && !globalValuesResume.column[globalSpaceSelected.column].includes(number)){ //we validate that the button number is not in the same box, row or column, otherwise we do not have to add it because it can provoque an error to the user
                                dispatch(newGlobalSudokuState({
                                    valueResolved: false,
                                    currentValue: null,
                                    currentError: false,
                                    boxId: globalSpaceSelected.box,
                                    index: globalSpaceSelected.index,
                                    pencilNumbers: [...globalSpaceSelected.pencilNumbers,number]
                                }))
                                dispatch(newSpaceSelected({
                                    value: globalSpaceSelected.value,
                                    initialValue: globalSpaceSelected.initialValue,
                                    valueResolved: false,
                                    currentValue: null,
                                    currentError: false,
                                    row: globalSpaceSelected.row,
                                    column: globalSpaceSelected.column,
                                    box: globalSpaceSelected.box,
                                    index: globalSpaceSelected.index,
                                    pencilNumbers: [...globalSpaceSelected.pencilNumbers,number]
                                }));
                                dispatch(updateGameHistory({
                                    valueResolved: false,
                                    currentValue: null,
                                    currentError: false,
                                    pencilNumbers: [...globalSpaceSelected.pencilNumbers,number],
                                    box: globalSpaceSelected.box,
                                    index: globalSpaceSelected.index,
                                    row: globalSpaceSelected.row,
                                    column: globalSpaceSelected.column,
                                    score: globalScore,
                                    remainingNumbers: remainingNumbers,
                                    valuesResume: globalValuesResume,
                                    addValue: false
                                }))
                            } else { //we execute this block of code in case the user select a button which number is already in the same box, row or column. In this case the number can not be added to the pencil numbers attribute 
                                    if(globalSpaceSelected.row != null && globalSpaceSelected.column != null){
                                        dispatch(newCurrentPencilValue([number,globalSpaceSelected.box,globalSpaceSelected.row, globalSpaceSelected.column]))
                                    }
                                }
                        } else {
                            const index = globalSpaceSelected.pencilNumbers.indexOf(number);
                            let newArray = [...globalSpaceSelected.pencilNumbers];
                            newArray.splice(index,1)
                            dispatch(newGlobalSudokuState({
                                valueResolved: false,
                                currentValue: null,
                                currentError: false,
                                boxId: globalSpaceSelected.box,
                                index: globalSpaceSelected.index,
                                pencilNumbers: newArray
                            }))
                            dispatch(newSpaceSelected({
                                value: globalSpaceSelected.value,
                                initialValue: globalSpaceSelected.initialValue,
                                valueResolved: false,
                                currentValue: null,
                                currentError: false,
                                row: globalSpaceSelected.row,
                                column: globalSpaceSelected.column,
                                box: globalSpaceSelected.box,
                                index: globalSpaceSelected.index,
                                pencilNumbers: newArray
                            }));
                        }
                    }
                }
            }
        }
    }
    //DYNAMIC PENCIL BUTTONS
    const dynamicPencilButton = (): string => {
        if(pencilGlobalState){
            if(globalSpaceSelected.pencilNumbers.includes(number)){
                return '-translate-y-4 bg-white outline outline-1 transition-transform';
            }
            return 'bg-gray-200 transition-all';
        }
        return '';
    }
    const valuesResumeHistory = () => {

    }

    return(
        <div className={`w-full p-1`}>
            <button onClick={handleAddNewValue} className={`w-full p-1 flex flex-col items-center bg-white rounded shadow-lg active:scale-125 ${findRemainingNumbers() === 0 && 'hidden'} ${dynamicPencilButton()}`}>
            <p className={`text-3xl font-medium transition-all ${pencilGlobalState ? 'text-black' : 'text-blue-700'}`}>{number}</p>
            <p className={`text-xs text-gray-400 transition-all ${pencilGlobalState && 'text-black'}`}>{findRemainingNumbers()}</p>
            </button>
        </div>
    )
}

export { NumberButton }