import { SingleBox } from './components/SingleBox';
import { Timer } from './components/Timer';
import { NumberButton } from './components/NumberButton';
import { randomSudokuGenerator } from './components/sudokuGenerator.d';
import { useAppSelector, useAppDispatch } from "./app/hooks";
// import { prueba, solucion, dificultad } from './components/sudokuGenerator.d'
import undoIcon from './assets/undo.png';
import eraserIcon from './assets/eraser.png';
import pencilIcon from './assets/edit.png';
import { Difficulty } from './components/Difficulty';
import { Mistakes } from './components/Mistakes';
import { Score } from './components/Score';
import { OtherOption } from './components/OtherOption';

function App() {

  //GLOBAL STATE
  const dispatch = useAppDispatch();
  //GAMEOVER STATE
  const gameoverState = useAppSelector((state) => {
      return state.gameData.gameover;
  })

  return (
    <>
      {/* HEADER */}
      <header className={`w-full h-10 bg-blue-400 flex items-center`}>
        <p className={`w-full text-lg text-black font-bold text-center`}>SUDOKU</p>
      </header>
      {/* SCORE */}
      <div className={`w-full mt-4 flex items-center`}>
        <Score/>
      </div>
      <main className={`w-full`}>
        {/* MISTAKES,DIFFICULTY,TIME */}
        <div className={`w-full flex justify-center`}>
          <div className={`w-[342px] py-1 grid grid-cols-3`}>
            <Mistakes/>
            <Difficulty/>
            <Timer/>
          </div>
        </div>
        {/* SUDOKU */}
        <div className={`w-full flex justify-center`}>
          <div className={`w-[342px] h-[342px] grid grid-cols-3 border-[2px] border-black gap-[2px] bg-black divide-black`}>
            {randomSudokuGenerator.map(box => 
              <SingleBox key={box.boxId} list={box.list} boxId={box.boxId}/>
            )}
          </div>
        </div>
        {/* OTHER OPTIONS */}
        <div className={`w-full mt-3 flex justify-center`}>
          <div className={`w-[342px] py-1 grid grid-cols-3`}>
            <OtherOption title='Undo' image={undoIcon}/>
            <OtherOption title='Eraser' image={eraserIcon}/>
            <OtherOption title='Pencil' image={pencilIcon}/>
          </div>
        </div>
        {/* NUMBERS */}
        <div className={`w-full mt-4 flex justify-center items-center`}>
          <div className={`w-[360px] grid grid-cols-9`}>
            <NumberButton number={1} />
            <NumberButton number={2} />
            <NumberButton number={3} />
            <NumberButton number={4} />
            <NumberButton number={5} />
            <NumberButton number={6} />
            <NumberButton number={7} />
            <NumberButton number={8} />
            <NumberButton number={9} />
          </div>
        </div>
      </main>
    </>
  )
}

export default App
