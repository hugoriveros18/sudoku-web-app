import React from "react"
import { SingleSpace } from "../SingleSpace";
import { RandomSudoku } from "../types.d";


function SingleBox({list,boxId}: RandomSudoku) {
    return(
        <ul className={`grid grid-cols-3 gap-[1px] bg-gray-400`}>
            {list.map((space,index) => 
                <SingleSpace key={space.value} boxId={boxId} index={index}/>
            )}
        </ul>
    )
}

export { SingleBox }