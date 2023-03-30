import "./chooseNumber.css";
import { useEffect, useState } from "react";
import { SquareActionType, squareStore } from "../../redux/squareStore";

function ChooseNumber(): JSX.Element {

    const [prev,setPrev] = useState<HTMLInputElement>();

    const chooseNum = (iteam:any,value:number)=>{
        if(prev)
            prev.style.color = "black" 
        iteam.style.color = "blue";
        setPrev(iteam)
        squareStore.dispatch({ type: SquareActionType.saveValue , payload: value})
    }

    return (
        <div >
			 <div >
                {[1,2,3,4,5,6,7,8,9].map(val=>
                    <div className="chooseNumber" onClick={(e)=>chooseNum((e.target as HTMLInputElement),val)}>
                        <b>{val}</b>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChooseNumber;
