import { useAppSelector } from "../../app/hooks";

function Difficulty() {

    //GAME DIFFICULTY
    const currentDifficulty = useAppSelector((state) => {
        return state.gameData.difficulty;
    })

    return (
        <p className={`w-full text-xs text-center font-medium text-black`}>{currentDifficulty}</p>
    )
}

export { Difficulty }
