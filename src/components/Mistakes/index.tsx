import { useAppSelector } from "../../app/hooks";

function Mistakes() {

    //MISTAKES COUNTER
    const globalmistakes = useAppSelector((state) => {
        return state.gameData.mistakes;
    })

    return (
        <p className={`w-full text-xs font-medium text-black`}>Mistakes: {globalmistakes} / 3</p>
    )
}

export { Mistakes }