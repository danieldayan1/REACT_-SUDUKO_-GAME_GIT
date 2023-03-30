import { useEffect, useState } from "react";
import SquareModel from "../../Models/SquareModel";
import { SquareActionType, squareStore } from "../../redux/squareStore";
import ChooseNumber from "../chooseNumber/chooseNumber";
import Square from "../square/square";
import "./main.css";

function Main(): JSX.Element {

    const [board , setBoard]= useState<SquareModel[]>();
    const length = 9;
    
    useEffect(()=>{
        chooseBoard();

        const unsubscribe = squareStore.subscribe(() => { //listen to any changes, and invoke the callback when something changed
            calcResult()
        })

        return () => {
            unsubscribe();
        }

    },[])


    const calcResult = ()=>{
        const value = squareStore.getState().value;
        const square = squareStore.getState().square;
        if(value && square && !square.success &&  square.value==value){
            square.success = true;
        }else{
            if(value && square)
                alert("WRONG")
        }
    }

    const chooseBoard=()=>{
        let squareChosen:SquareModel[] = []; 
        let numbersToPick = [1,2,3,4,5,6,7,8,9].sort(function(a){return a-(Math.random()*10)})
        let index=0;
  
        //build board
        for(let i=0;i<length;i++){
            let first = numbersToPick.shift();
            numbersToPick.push(first);
            let reveald = Math.floor(Math.random()*10)
            for(let j=0;j<length;j++){
                let s = new SquareModel();
                s.index = ++index;
                s.value = numbersToPick[j];
                if(j===reveald)
                    s.success = true;
                squareChosen.push(s);
            }
        }
        setBoard(squareChosen);  
    }
    

    return (
        <div className="main">
            {board?.map((val,index) =>
                <div style={{display:"inline"}}> 
                    <Square square={val}/> 
                    {(index+1)%9===0&&<br/>}
                </div>

            )}         
            <br/>
          <div>
            <ChooseNumber /><br/>
          </div>
        </div>
    );
}

export default Main;
