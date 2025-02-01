import React from 'react'
import players from '../utils/players';
// toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SelectPlayers({ setplayer1, setplayer2, setplayer3, setplayer4, id, player1,player2,player3,player4, setcount, count }) {
  
  const fulldetails1 = players.filter((data) => {
    return data.name === player1;
  })
  const fulldetails2 = players.filter((data) => {
    return data.name === player2;
  })
  const fulldetails3 = players.filter((data) => {
    return data.name === player3;
  })
  const fulldetails4 = players.filter((data) => {
    return data.name === player4;
  })


  const handleChange1 = (e)=>{  
    const current = players.filter((data) => {
      return data.name === e.target.value;
    })
    if (count === 2) {
      if (player1 === undefined) {
        if (current[0].country !== 'India') {
          toast.error("Can't take more than 3 foreigners")
          return;
        }
      }
      else {
        const prev = players.filter((data) => {
          return data.name === player1;
        })
        if (prev[0].country === 'India' && current[0].country !== "India") {
          toast.error("Can't take more than 3 foreigners")
          return;
        }
      }
    }
    setplayer1(e.target.value);
    if (fulldetails1.length===0) {
      if (current[0].country !== "India") {
        setcount(count + 1);
      }
      return;
    }
    if (fulldetails1[0].country==="India") {
      if (current[0].country!=="India") {
        setcount(count+1);
      }
    }
    else if (fulldetails1[0].country!=="India") {
      if (current[0].country==="India") {
        setcount(count-1);
      }
    }
  }

  const handleChange2 = (e)=>{   
    const current = players.filter((data) => {
      return data.name === e.target.value;
    })
    if (count === 2) {
      if (player2 === undefined) {
        if (current[0].country !== 'India') {
          toast.error("Can't take more than 3 foreigners")
          return;
        }
      }
      else {
        const prev = players.filter((data) => {
          return data.name === player2;
        })
        const current = players.filter((data) => {
          return data.name === e.target.value;
        })
        if (prev[0].country === 'India' && current[0].country !== "India") {
          toast.error("Can't take more than 3 foreigners")
          return;
        }
      }
    }
    setplayer2(e.target.value);
    if (fulldetails2.length===0) {
      if (current[0].country !== "India") {
        setcount(count + 1);
      }
      return;
    }
    if (fulldetails2[0].country==="India") {
      if (current[0].country!=="India") {
        setcount(count+1);
      }
    }
    else if (fulldetails2[0].country!=="India") {
      if (current[0].country==="India") {
        setcount(count-1);
      }
    }
  }

  const handleChange3 = (e)=>{   
    const current = players.filter((data) => {
      return data.name === e.target.value;
    })
    if (count === 2) {
      if (player3 === undefined) {
        if (current[0].country !== 'India') {
          toast.error("Can't take more than 3 foreigners")
          return;
        }
      }
      else {
        const prev = players.filter((data) => {
          return data.name === player3;
        })
        if (prev[0].country === 'India' && current[0].country !== "India") {
          toast.error("Can't take more than 3 foreigners")
          return;
        }
      }
    }
    setplayer3(e.target.value);
    if (fulldetails3.length===0) {
      if (current[0].country !== "India") {
        setcount(count + 1);
      }
      return;
    }
    if (fulldetails3[0].country==="India") {
      if (current[0].country!=="India") {
        setcount(count+1);
      }
    }
    else if (fulldetails3[0].country!=="India") {
      if (current[0].country==="India") {
        setcount(count-1);
      }
    }
  }

  const handleChange4 = (e)=>{   
    const current = players.filter((data) => {
      return data.name === e.target.value;
    })
    if (count === 2) {
      if (player4 === undefined) {
        if (current[0].country !== 'India') {
          toast.error("Can't take more than 3 foreigners")
          return;
        }
      }
      else {
        const prev = players.filter((data) => {
          return data.name === player4;
        })
        if (prev[0].country === 'India' && current[0].country !== "India") {
          toast.error("Can't take more than 3 foreigners")
          return;
        }
      }
    }
    setplayer4(e.target.value);
    if (fulldetails4.length===0) {
      if (current[0].country !== "India") {
        setcount(count + 1);
      }
      return;
    }
    if (fulldetails4[0].country==="India") {
      if (current[0].country!=="India") {
        setcount(count+1);
      }
    }
    else if (fulldetails4[0].country!=="India") {
      if (current[0].country==="India") {
        setcount(count-1);
      }
    }
  }

  return (
    <>
      <div className={`mt-10 mr-8 ml-8 ${id!=="1"?'hidden':''}`} >
        <select value={player1} className={` ${fulldetails1.length!==0 ? (fulldetails1[0].country === "India" ? "bg-blue-600" : "bg-yellow-400") : "bg-blue-600"} text-white text-2xl rounded-lg block p-2.5 dark:placeholder-gray-400 dark:text-white focus:outline-none`} style={{ width: "28rem" }} onChange={handleChange1}>
          <option value="" hidden>Choose a 1st player for retention</option>
          {players
            .filter((player) => player.name !== player2 && player.name !== player3 && player.name !== player4)
            .map((player, id) => {
              return (
                <option key={id} value={player.name}>
                  {player.name} - {player.country} - {player.type}
                </option>
              );
            })}
        </select>
      </div>
      <div className={`mt-10 mr-8 ml-8 ${id !== "2" ? 'hidden' : ''}`}>
        <select value={player2} className={` ${fulldetails2.length !== 0 ? (fulldetails2[0].country === "India" ? "bg-blue-600" : "bg-yellow-400") : "bg-blue-600"} text-white text-2xl rounded-lg block p-2.5 dark:placeholder-gray-400 dark:text-white focus:outline-none`} style={{ width: "28rem" }} onChange={handleChange2}>
          <option value="" hidden>Choose a 2nd player for retention</option>
          {players
            .filter((player) => player.name !== player1 && player.name !== player3 && player.name !== player4)
            .map((player, id) => {
              return (
                <option key={id} value={player.name}>
                  {player.name} - {player.country} - {player.type}
                </option>
              );
            })}
        </select>
      </div>
      <div className={`mt-10 mr-8 ml-8 ${id !== "3" ? 'hidden' : ''}`}>
        <select value={player3} className={` ${fulldetails3.length !== 0 ? (fulldetails3[0].country === "India" ? "bg-blue-600" : "bg-yellow-400") : "bg-blue-600"} text-white text-2xl rounded-lg block p-2.5 dark:placeholder-gray-400 dark:text-white focus:outline-none`} style={{ width: "28rem" }} onChange={handleChange3}>
          <option value="" hidden>Choose a 3rd player for retention</option>
          {players
            .filter((player) => player.name !== player1 && player.name !== player2 && player.name !== player4)
            .map((player, id) => {
              return (
                <option key={id} value={player.name}>
                  {player.name} - {player.country} - {player.type}
                </option>
              );
            })}
        </select>
      </div>
      <div className={`mt-10 mr-8 ml-8 ${id !== "4" ? 'hidden' : ''}`}>
        <select value={player4} className={` ${fulldetails4.length !== 0 ? (fulldetails4[0].country === "India" ? "bg-blue-600" : "bg-yellow-400") : "bg-blue-600"} text-white text-2xl rounded-lg block p-2.5 dark:placeholder-gray-400 dark:text-white focus:outline-none`} style={{ width: "28rem" }} onChange={handleChange4}>
          <option value="" hidden>Choose a 4th player for retention</option>
          {players
            .filter((player) => player.name !== player1 && player.name !== player2 && player.name !== player3)
            .map((player, id) => {
              return (
                <option key={id} value={player.name}>
                  {player.name} - {player.country} - {player.type}
                </option>
              );
            })}
        </select>
      </div>
    </>
  )
}

export default SelectPlayers
