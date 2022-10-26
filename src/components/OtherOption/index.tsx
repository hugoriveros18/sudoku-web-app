import { useAppSelector,useAppDispatch } from "../../app/hooks";
import { newGlobalSudokuState } from "../../features/sudokuState/sudokuState";
import { newSpaceSelected } from "../../features/spaceSelection/spaceSelection";
import { changePencilState,undoGameHistory } from "../../features/gameData/gameData";


interface OtherOptionProps {
    title: string;
    image: string;
}

function OtherOption({title,image}: OtherOptionProps) {

    //GLOBAL STATE
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
    //GAME HISTORY
    const gameHistory = useAppSelector((state) => {
        return state.gameData.gameHistory
    })


    //FUNCTIONS
    const handleOption = () => {
        if(title === 'Eraser'){
            if(globalSpaceSelected.box != null && globalSpaceSelected.index != null && !globalSpaceSelected.initialValue && !globalSpaceSelected.valueResolved){
                dispatch(newGlobalSudokuState({
                    valueResolved: false,
                    currentValue: null,
                    currentError: false,
                    boxId: globalSpaceSelected.box,
                    index: globalSpaceSelected.index,
                    pencilNumbers: []
                }));
                dispatch(newSpaceSelected({
                    value: globalSpaceSelected.value,
                    initialValue: false,
                    valueResolved: false,
                    currentValue: null,
                    currentError: false,
                    row: globalSpaceSelected.row,
                    column: globalSpaceSelected.column,
                    box: globalSpaceSelected.box,
                    index: globalSpaceSelected.index,
                    pencilNumbers: []
                }));
            }
        } else if(title === 'Pencil'){
            dispatch(changePencilState())
        } else {
            if(gameHistory.length > 0) { //we make sure that at least there is a single value in the game history, otherwise we will not take any action
                if(gameHistory.length == 1 && globalSpaceSelected.box != null && globalSpaceSelected.index != null){ //we execute this block in the single case that there is only one value or record in the game history 
                    dispatch(newGlobalSudokuState({
                        valueResolved: false,
                        currentValue: null,
                        currentError: false,
                        boxId: gameHistory[0].box,
                        index: gameHistory[0].index,
                        pencilNumbers: []
                    }))
                    dispatch(newSpaceSelected({
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
                    }));
                    dispatch(undoGameHistory([]))
                } else { //we execute this block of code only when there are two or more values in the game record
                    dispatch(newGlobalSudokuState({
                        valueResolved: false,
                        currentValue: null,
                        currentError: false,
                        boxId: gameHistory[gameHistory.length-1].box,
                        index: gameHistory[gameHistory.length-1].index,
                        pencilNumbers: []
                    }))
                    dispatch(newGlobalSudokuState({
                        valueResolved: gameHistory[gameHistory.length-2].valueResolved,
                        currentValue: gameHistory[gameHistory.length-2].currentValue,
                        currentError: gameHistory[gameHistory.length-2].currentError,
                        boxId: gameHistory[gameHistory.length-2].box,
                        index: gameHistory[gameHistory.length-2].index,
                        pencilNumbers: gameHistory[gameHistory.length-2].pencilNumbers
                    }))
                    dispatch(newSpaceSelected({
                        value: globalSpaceSelected.value,
                        initialValue: false,
                        valueResolved: gameHistory[gameHistory.length-2].valueResolved,
                        currentValue: gameHistory[gameHistory.length-2].currentValue,
                        currentError: gameHistory[gameHistory.length-2].currentError,
                        row: gameHistory[gameHistory.length-2].row,
                        column: gameHistory[gameHistory.length-2].column,
                        box: gameHistory[gameHistory.length-2].box,
                        index: gameHistory[gameHistory.length-2].index,
                        pencilNumbers: gameHistory[gameHistory.length-2].pencilNumbers
                    }));
                    const newArray = [...gameHistory];
                    newArray.pop() 
                    dispatch(undoGameHistory(newArray))
                   
                }
            }
        }
    }

    return (
        <div className={`w-full flex flex-col justify-center items-center`}>
            <div onClick={handleOption} className={`p-2 flex flex-col justify-center items-center gap-2 active:bg-gray-300 rounded`}>
              <img className={`w-5`} src={image} alt="Undo icon"/>
              <p className={`text-sm`}>{title}</p>
            </div>
        </div>
    )
}

export { OtherOption }