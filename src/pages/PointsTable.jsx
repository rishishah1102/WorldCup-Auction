import React, { useEffect, useState } from "react";

// toast
import { toast } from "react-toastify";

// axios
import instance from "../utils/axios";
import PlayerScoreCard from "../components/PlayerScoreCard";
import ScoreBoard from "../components/ScoreBoard";
import LeaderBoard from "../components/LeaderBoard";
import AdminScoreBoard from "../components/AdminScoreBoard";

function PointsTable() {
  const [lb, setLb] = useState(true);
  const [sb, setSb] = useState(false);
  const [ps, setPs] = useState(false);

  const [auctioneer, setAuctioneer] = useState(false);

  const [aucplayers, setAucPlayers] = useState([]);
  const [lbdata, setLbdata] = useState([]);
  const [sbdata, setSbdata] = useState([]);
  const [psdata, setPsdata] = useState({
    totalEp: 0,
    totalBp: 0,
    playerscores: [],
  });

  // title
  useEffect(() => {
    document.title = "Points-Table";
  }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await instance.get("/home", {
          headers: { Authorization: localStorage.getItem("auction") },
        });
        if (res.status === 200) {
          setAuctioneer(res.data.foundUser.isAuctioneer);
        }
      };
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, []);

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

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await instance.get("/leaderboard", {
          headers: { Authorization: localStorage.getItem("auction") },
        });
        if (res.status === 200) {
          setLbdata(res.data.leaderboard);
        }
      };
      fetchData();
    } catch (error) {
      toast.error("Error in getting LeaderBoard data");
    }
  }, []);

  const handleClick = async (name) => {
    if (name === "LeaderBoard") {
      setPs(false);
      setSb(false);
      setLb(true);
      // response
      try {
        const res = await instance.get("/leaderboard", {
          headers: { Authorization: localStorage.getItem("auction") },
        });
        if (res.status === 200) {
          setLbdata(res.data.leaderboard);
        }
      } catch (error) {
        toast.error("Error in getting LeaderBoard data");
      }
    } else if (name === "PlayerScores") {
      setPs(false);
      setLb(false);
      setSb(true);
      // response
      try {
        const res = await instance.get("/scoreboard", {
          headers: { Authorization: localStorage.getItem("auction") },
        });
        if (res.status === 200) {
          setSbdata(res.data.scoreboard);
        }
      } catch (error) {
        toast.error("Error in getting ScoreBoard data");
      }
    } else {
      setSb(false);
      setLb(false);
      setPs(true);
      // response
      try {
        const res = await instance.post(
          "/playerscores",
          { email: name },
          {
            headers: { Authorization: localStorage.getItem("auction") },
          }
        );
        if (res.status === 200) {
          setPsdata(res.data.playerscores);
        }
      } catch (error) {
        toast.error("Error in getting Player scores data");
      }
    }
  };

  return (
    <div
      className="w-screen flex flex-col justify-center items-center"
      // style={{ height: "calc(100vh - 112px - 56px)" }}
    >
      {/* buttons */}
      <div className="w-[90%] flex justify-evenly items-center mt-5 mb-2 bg-neutral-200 p-4 rounded-md flex-wrap">
        <button
          className="bg-blue-600 border-none outline-none text-white text-2xl h-12 w-44 my-2 rounded-lg transition-all duration-300 ease-in-out hover:tracking-wider"
          onClick={() => handleClick("LeaderBoard")}
        >
          Leader-Board
        </button>
        <button
          className="bg-blue-600 border-none outline-none text-white text-2xl h-12 w-48 my-2 rounded-lg transition-all duration-300 ease-in-out hover:tracking-wider"
          onClick={() => handleClick("PlayerScores")}
        >
          Players Scores
        </button>
        {aucplayers.map((player, index) => {
          return (
            <button
              className="bg-blue-600 border-none outline-none text-white text-2xl h-12 my-2 w-36 rounded-lg transition-all duration-300 ease-in-out hover:tracking-wider"
              onClick={() => handleClick(player.email)}
              key={index}
            >
              {player.teamname}
            </button>
          );
        })}
      </div>

      {/* list of scores */}
      <div className="w-[90%] m-4 shadow-black shadow-3xl rounded-md">
        {lb && <LeaderBoard data={lbdata} />}
        {sb ? (
          auctioneer ? (
            <AdminScoreBoard data={sbdata} />
          ) : (
            <ScoreBoard data={sbdata} />
          )
        ) : null}
        {ps && <PlayerScoreCard data={psdata} />}
      </div>
    </div>
  );
}

export default PointsTable;
