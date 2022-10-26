import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { newSpaceSelected } from "../../features/spaceSelection/spaceSelection";
import { newGlobalSudokuState } from "../../features/sudokuState/sudokuState";

interface SingleSpaceProps {
    boxId: number;
    index: number;
}

function SingleSpace({boxId,index}: SingleSpaceProps ) {

    //STATES
    const [pencilError,setPencilError] = useState<boolean>(false);
    const [firtsRender,setFirstRender] = useState<boolean>(true);

    // GLOBAL STATE 
    const dispatch = useAppDispatch();
    //CURRENT GLOBAL SPACE SELECTED INFORMATION
    const globalSpaceSelected = useAppSelector((state) => {
        return {
            valueResolved: state.spaceSelected.valueResolved, 
            value: state.spaceSelected.value,
            currentValue: state.spaceSelected.currentValue,
            row: state.spaceSelected.row,
            column: state.spaceSelected.column,
            box: state.spaceSelected.box,
            index: state.spaceSelected.index,
        }
    })
    //LOCAL SPACE INFORMATION
    const globalStateSpace = useAppSelector((state) => {
        return state.globalState[boxId-1].list[index];
    })
    //PENCIL GLOBAL STATE
    const pencilCurrentNumber = useAppSelector((state) => {
        return state.gameData.pencil.currentPencilNumber
    })

    //EFECTS
    useEffect(() => {
        if(firtsRender){
            setFirstRender(false);
        } else {
            if(pencilCurrentNumber.number === globalStateSpace.currentValue){
                if(pencilCurrentNumber.box === boxId || pencilCurrentNumber.row === globalStateSpace.row || pencilCurrentNumber.column === globalStateSpace.column){
                    setPencilError(true);
                    setTimeout(() => {
                        setPencilError(false);
                    },1000)
                }
            }
        }
    },[pencilCurrentNumber])

    useEffect(() => {
        if(globalSpaceSelected.valueResolved){
            if(globalSpaceSelected.box === boxId || globalSpaceSelected.box === globalStateSpace.row || globalSpaceSelected.column === globalStateSpace.column){
                const index = globalStateSpace.pencilNumbers.indexOf(globalSpaceSelected.currentValue);
                if(index != -1){
                    let newPencilNumbers = [...globalStateSpace.pencilNumbers]
                    newPencilNumbers.splice(index,1)
                    dispatch(newGlobalSudokuState({
                        valueResolved: globalStateSpace.valueResolved,
                        currentValue: globalStateSpace.currentValue,
                        currentError: false,
                        boxId: boxId,
                        index: index,
                        pencilNumbers: newPencilNumbers
                    }))
                }
            }
        }
    },[globalSpaceSelected])
    
    // METHODS
    const selectNewGlobalSpace = (): void => {
        dispatch(newSpaceSelected({
            value: globalStateSpace.value,
            initialValue: globalStateSpace.initialValue,
            valueResolved: globalStateSpace.valueResolved,
            currentValue: globalStateSpace.currentValue,
            currentError: globalStateSpace.currentError,
            row: globalStateSpace.row,
            column: globalStateSpace.column,
            box: boxId,
            index: index,
            pencilNumbers: globalStateSpace.pencilNumbers
        }));
    }

    //DYNAMIC STYLES
    const dynamicSpace = (): string => {
        if(globalSpaceSelected.currentValue === null && globalSpaceSelected.value === null) {
            return 'bg-white';
        }
        if(globalSpaceSelected.currentValue === globalStateSpace.currentValue){
            if(globalStateSpace.currentValue != null){
                return 'bg-blue-300';
            }
            if((globalStateSpace.currentValue === null) && (globalSpaceSelected.row === globalStateSpace.row && globalSpaceSelected.column === globalStateSpace.column && globalSpaceSelected.box === boxId)) {
                return 'bg-blue-300'
            }
            if((globalStateSpace.currentValue === null) && (globalSpaceSelected.row != globalStateSpace.row && globalSpaceSelected.column != globalStateSpace.column && globalSpaceSelected.box != boxId)) {
                return 'bg-white'
            }
            return 'bg-gray-100';

        }
        if(globalSpaceSelected.row === globalStateSpace.row || globalSpaceSelected.column === globalStateSpace.column || globalSpaceSelected.box == boxId){
            return 'bg-gray-100';
        }
        return 'bg-white';
    }
    const dynamicTextColor = (): string => {
        if(globalStateSpace.initialValue){
            return 'text-black';
        }
        return globalStateSpace.currentError
        ? 'text-red-500 bg-red-200'
        : 'text-blue-800'
    }
    const dynamicBorder = () => {
        if(globalSpaceSelected.row === globalStateSpace.row && globalSpaceSelected.column === globalStateSpace.column){
            return 'bg-gray-600 opacity-100';
        }
    }
    const dynamicPencilNumbers = (num: number): string => {
        if(globalStateSpace.pencilNumbers.includes(num)){
            return 'opacity-100'
        }
        return 'opacity-0'
    }

    return(
        <li onClick={selectNewGlobalSpace} className={`relative w-full h-full flex justify-center items-center text-2xl font-medium transition-all duration-75 ${dynamicTextColor()} ${dynamicSpace()}`}>
            {globalStateSpace.currentValue}
            <div className={`absolute w-full h-full grid grid-cols-3 grid-rows-3`}>
                <div className={`flex justify-center items-center`}>
                    <p className={`text-[8px] text-gray-600 ${dynamicPencilNumbers(1)}`}>1</p>
                </div>
                <div className={`flex justify-center items-center`}>
                    <p className={`text-[8px] text-gray-600 ${dynamicPencilNumbers(2)}`}>2</p>
                </div>
                <div className={`flex justify-center items-center`}>
                    <p className={`text-[8px] text-gray-600 ${dynamicPencilNumbers(3)}`}>3</p>
                </div>
                <div className={`flex justify-center items-center`}>
                    <p className={`text-[8px] text-gray-600 ${dynamicPencilNumbers(4)}`}>4</p>
                </div>
                <div className={`flex justify-center items-center`}>
                    <p className={`text-[8px] text-gray-600 ${dynamicPencilNumbers(5)}`}>5</p>
                </div>
                <div className={`flex justify-center items-center`}>
                    <p className={`text-[8px] text-gray-600 ${dynamicPencilNumbers(6)}`}>6</p>
                </div>
                <div className={`flex justify-center items-center`}>
                    <p className={`text-[8px] text-gray-600 ${dynamicPencilNumbers(7)}`}>7</p>
                </div>
                <div className={`flex justify-center items-center`}>
                    <p className={`text-[8px] text-gray-600 ${dynamicPencilNumbers(8)}`}>8</p>
                </div>
                <div className={`flex justify-center items-center`}>
                    <p className={`text-[8px] text-gray-600 ${dynamicPencilNumbers(9)}`}>9</p>
                </div>
            </div>
            {/* SPACE SELECTED STYLE */}
            <div className={`absolute w-full h-full`}>
                <div className={`absolute inset-x-0 top-0 h-[2px] transition-all duration-300 ${dynamicBorder()}`}></div>
                <div className={`absolute inset-x-0 bottom-0 h-[2px] transition-all duration-300 ${dynamicBorder()}`}></div>
                <div className={`absolute inset-y-0 left-0 w-[2px] transition-all duration-300 ${dynamicBorder()}`}></div>
                <div className={`absolute inset-y-0 right-0 w-[2px] transition-all duration-300 ${dynamicBorder()}`}></div>
            </div>
            {/* PENCIL ERROR STYLE */}
            <div className={`absolute w-full h-full`}>
                <div className={`absolute inset-x-0 top-0 h-1 transition-all duration-300 ${pencilError && 'bg-red-600 opacity-100'}`}></div>
                <div className={`absolute inset-x-0 bottom-0 h-1 transition-all duration-300 ${pencilError && 'bg-red-600 opacity-100'}`}></div>
                <div className={`absolute inset-y-0 left-0 w-1 transition-all duration-300 ${pencilError && 'bg-red-600 opacity-100'}`}></div>
                <div className={`absolute inset-y-0 right-0 w-1 transition-all duration-300 ${pencilError && 'bg-red-600 opacity-100'}`}></div>
            </div>
        </li>
    )
}

export { SingleSpace }