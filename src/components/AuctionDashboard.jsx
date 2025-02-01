import React, { useState, useEffect } from "react";

// icons
import FlagIcon from "@mui/icons-material/Flag";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import Diversity2SharpIcon from "@mui/icons-material/Diversity2Sharp";
import ShoppingCartCheckoutSharpIcon from "@mui/icons-material/ShoppingCartCheckoutSharp";
import AccountBalanceSharpIcon from "@mui/icons-material/AccountBalanceSharp";
import ScoreboardSharpIcon from "@mui/icons-material/ScoreboardSharp";

// utils
import instance from "../utils/axios";
import { toast } from "react-toastify";

function AuctionDashboard() {
  const [playerNumber, setPlayerNumber] = useState(0);
  const [buyerName, setBuyerName] = useState("");
  const [sellingPrice, setSellingPrice] = useState();
  const [hammerType, setHammerType] = useState("");
  const [aucPlayers, setAucPlayers] = useState([]);
  const [iplPlayers, setIplPlayers] = useState([]);
  const [iplPlayerData, setIplPlayerData] = useState();

  // no of users
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await instance.get("/pointstable", {
          headers: { Authorization: localStorage.getItem("auction") },
        });
        if (res.status === 200) {
          setAucPlayers(res.data.aucPlayers);
        }
      };
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, []);

  const sellPlayer = async () => {
    if (sellingPrice && buyerName) {
      const userName = aucPlayers.filter((player, index) =>
        player.email === buyerName ? player.username : null
      )[0];

      try {
        const res = await instance.post(
          "/sellplayer",
          {
            playerId: iplPlayerData._id,
            currentTeam: buyerName,
            sellingPrice,
            prevTeam: userName.username,
          },
          {
            headers: { Authorization: localStorage.getItem("auction") },
          }
        );
        if (res.status === 200) {
          setPlayerNumber(0);
          setBuyerName("");
          setSellingPrice(0);
          setIplPlayerData();

          window.location.reload();
        }
      } catch (error) {
        toast.error("Could not sell player!");
      }
    } else {
      toast.error("Please enter selling price and select buyer name");
    }
  };

  const unsellPlayer = async () => {
    try {
      const res = await instance.post(
        "/unsellplayer",
        { playerNumber },
        {
          headers: { Authorization: localStorage.getItem("auction") },
        }
      );
      if (res.status === 200) {
        setPlayerNumber(0);
        setBuyerName("");
        setSellingPrice(0);
        setIplPlayerData();
      }
    } catch (error) {
      toast.error("Could not unsell the player!");
    }
  };

  const hammerPlayers = async (e) => {
    const newHammerType = e.target.value;
    setHammerType(newHammerType);

    try {
      const res = await instance.post(
        "/hammer",
        { hammerType: newHammerType },
        {
          headers: { Authorization: localStorage.getItem("auction") },
        }
      );
      if (res.status === 200) {
        setIplPlayers(res.data.players);
      }
    } catch (error) {
      toast.error("Could not change Hammer Type!");
    }
  };

  const playerData = (e) => {
    const number = e.target.value;
    setPlayerNumber(number);

    try {
      iplPlayers.map((player) => {
        if (player.playerNumber == number) {
          setIplPlayerData(player);
        }
        return null;
      });
    } catch (error) {
      toast.error("Unable to set the player data");
    }
  };

  return (
    <div className="w-[48vw] h-[48vh] m-3 text-white auctionboard rounded-xl flex">
      <div className="w-[50%] flex flex-col justify-center items-center">
        <select
          id="playerNumber"
          className="text-white w-[230px] h-16 text-3xl px-3 border-none outline-none cursor-pointer bg-blue-600"
          value={playerNumber}
          onChange={playerData}
        >
          <option value={0} selected disabled hidden>
            Select Player No
          </option>
          {iplPlayers.map((number) => {
            return (
              <option key={number.playerNumber} value={number.playerNumber}>
                {number.playerNumber}
              </option>
            );
          })}
        </select>

        <div className="flex flex-col items-center justify-center my-3 text-black w-full">
          {/* Name */}
          <h1 className="text-[32px] font-extrabold">
            {iplPlayerData?.playerName}
          </h1>
          <div className="flex flex-col justify-center items-start w-[250px]">
            {/* Country */}
            <h3 className="text-3xl font-bold my-1">
              <FlagIcon style={{ fontSize: "22px", paddingBottom: "4px" }} />
              Country - {iplPlayerData?.country}
            </h3>
            {/* Type */}
            <h3 className="text-3xl font-bold my-1">
              <SportsCricketIcon
                style={{ fontSize: "22px", paddingBottom: "4px" }}
              />
              Type - {iplPlayerData?.playerType}
            </h3>
          </div>
          <div className="flex flex-col justify-center items-start w-[250px]">
            {/* Ipl Team */}
            <h3 className="text-3xl font-bold my-1">
              <Diversity2SharpIcon
                style={{ fontSize: "22px", paddingBottom: "4px" }}
              />
              IPL Team - {iplPlayerData?.iplTeam}
            </h3>
            {/* Prev Team */}
            <h3 className="text-3xl font-bold my-1">
              <ShoppingCartCheckoutSharpIcon
                style={{ fontSize: "22px", paddingBottom: "4px" }}
              />
              Previous Team - {iplPlayerData?.prevTeam}
            </h3>
          </div>
          <div className="flex flex-col justify-center items-start w-[250px]">
            {/* Base price */}
            <h3 className="text-3xl font-bold my-1">
              <AccountBalanceSharpIcon
                style={{ fontSize: "22px", paddingBottom: "4px" }}
              />
              Base Price - ₹{iplPlayerData?.basePrice} Cr
            </h3>
            {/* prev fantasy pts */}
            <h3 className="text-3xl font-bold my-1">
              <ScoreboardSharpIcon
                style={{ fontSize: "22px", paddingBottom: "4px" }}
              />
              Prev Fantasy Pts - {iplPlayerData?.prevFantasyPoints}
            </h3>
          </div>
        </div>
      </div>
      <div className="w-[50%] flex flex-col justify-center items-center relative">
        <select
          id="hammerSelection"
          className="text-white w-[160px] h-12 text-3xl px-3 border-none outline-none cursor-pointer absolute top-4 right-4 bg-blue-600"
          onChange={hammerPlayers}
        >
          <option value="" selected disabled hidden>
            Hammer Type
          </option>
          <option value="Sold">All Players</option>
          <option value="Unsold">Unsold Players</option>
        </select>

        <select
          id=""
          className="text-white w-[230px] h-16 text-3xl px-3 border-none outline-none cursor-pointer bg-blue-600"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
        >
          <option value="" selected disabled hidden>
            Select Player
          </option>
          {aucPlayers.map((player, index) => {
            return (
              <option value={player.email} className="text-white" key={index}>
                {player.teamname}
              </option>
            );
          })}
        </select>
        {/* input field for bid amount */}
        <input
          type="number"
          className="w-[230px] h-16 text-3xl my-4 px-3 border-none outline-none text-black placeholder:text-3xl"
          placeholder="Enter Bid Amount"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
        />
        <div>
          {/* button to sold */}
          <button
            className="outline-none border-none w-40 py-2 rounded-lg text-3xl m-3 bg-blue-600"
            onClick={sellPlayer}
          >
            Sold
          </button>
          {/* button to unsold */}
          <button
            className="outline-none border-none w-36 py-2 rounded-lg text-3xl m-3 bg-red-500"
            onClick={unsellPlayer}
          >
            UnSold
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuctionDashboard;
