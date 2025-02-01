import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

// toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectPlayers from '../components/SelectPlayers';
import RetaintionCard from '../components/RetaintionCard';

function Retention() {
  const [count,setCount] = useState(0);
  const [player1,setPlayer1] = useState();
  const [player2,setPlayer2] = useState();
  const [player3,setPlayer3] = useState();
  const [player4,setPlayer4] = useState();
  const [finalplayers,setFinalPlayers] = useState([]);
  const [done,setDone] = useState(false);
  const navigate = useNavigate();

  if (!localStorage.getItem("auction")) {
    toast.error("Register yourself first!");
    navigate("/auth");
  }

  // title
  useEffect(() => {
    document.title = "Retention";
  }, []);

  const setplayer1 = (player)=>{
    setPlayer1(player);
  }
  const setplayer2 = (player)=>{
    setPlayer2(player);
  }
  const setplayer3 = (player)=>{
    setPlayer3(player);
  }
  const setplayer4 = (player)=>{
    setPlayer4(player);
  }


  const setcount = (ct)=>{
    setCount(ct)
  }

  const submitPlayer = (e)=>{
    e.preventDefault();
    if (done===false) {  
      if (player1!==undefined) {
        setFinalPlayers(finalplayers.push(player1))
      }
      if (player2!==undefined) {
        setFinalPlayers(finalplayers.push(player2))
      }
      if (player3!==undefined) {
        setFinalPlayers(finalplayers.push(player3))
      }
      if (player4!==undefined) {
        setFinalPlayers(finalplayers.push(player4))
      }
    }
    setDone(true)
  }

  return (
    <div>
      <div className='flex flex-col justify-center items-center h-[84.6vh]'>
        <div className='flex flex-col'>
          <div className="flex">
            <SelectPlayers setplayer1={setplayer1} id="1" player1={player1} player2={player2} player3={player3} player4={player4} setcount={setcount} count={count}/>
            <SelectPlayers setplayer2={setplayer2} id="2" player1={player1} player2={player2} player3={player3} player4={player4} setcount={setcount} count={count}/>
          </div>
          <div className="flex">
            <RetaintionCard player1={player1} />
            <RetaintionCard player2={player2}/>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className="flex">
            <SelectPlayers setplayer3={setplayer3} id="3" player1={player1} player2={player2} player3={player3} player4={player4} setcount={setcount} count={count}/>
            <SelectPlayers setplayer4={setplayer4} id="4" player1={player1} player2={player2} player3={player3} player4={player4} setcount={setcount} count={count}/>
          </div>
          <div className="flex">
            <RetaintionCard player3={player3} />
            <RetaintionCard player4={player4} />
          </div>
        </div>
        <div className='mt-5 flex justify-center w-[120rem]'><button type="submit" disabled={done} className='p-3 rounded-lg bg-yellow-400 font-bold tracking-wide hover:bg-yellow-500 hover:italic text-white text-2xl w-[50%]' onClick={submitPlayer}>Submit Retentions</button></div>
      </div>
    </div>
  )
}

export default Retention