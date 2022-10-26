import { useAppSelector } from "../../app/hooks";

function Score() {

    //GAME SCORE
    const globalScore = useAppSelector((state) => {
        return state.gameData.score;
    })

    return (
        <p className={`w-full text-lg text-center font-semibold text-blue-800`}>Score : {globalScore}</p>
    )
}

export { Score }