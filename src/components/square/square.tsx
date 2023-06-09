import { useEffect, useState } from "react";
import SquareModel from "../../Models/SquareModel";
import { SquareActionType, squareStore } from "../../redux/squareStore";
import "./square.css";

interface SquareProps {
    square: SquareModel;
}

function Square(props:SquareProps): JSX.Element {

    const [sucsess,setSucsess] = useState<Boolean>(false);
    const [color,setColor]  = useState<string>()

    useEffect(()=>{

        setSucsess(props.square.success)

        const unsubscribe = squareStore.subscribe(() => { //listen to any changes, and invoke the callback when something changed
            setSucsess(props.square.success)
        })

        return () => {
            unsubscribe();
        }
    },[])
  
    const chooseSquare = ()=>{
        setColor("red")
        squareStore.dispatch({ type: SquareActionType.saveSquare, payload: props.square })
    }



    return (
        <span>{sucsess?<div className="square">
                <span >:::{props.square.value}:::</span>
            </div>:
            <div className = "square" onClick={(e)=>{chooseSquare()}} >
               <span style={{color:color}}>::::::::</span>
            </div>}
        </span>

    );
}

export default Square;
