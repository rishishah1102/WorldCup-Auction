import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// axios
import instance from "../utils/axios";

// toast
import { toast } from "react-toastify";

function WeeklyTeams() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player3, setPlayer3] = useState("");
  const [player4, setPlayer4] = useState("");
  const [player5, setPlayer5] = useState("");
  const [player6, setPlayer6] = useState("");
  const [player7, setPlayer7] = useState("");
  const [player8, setPlayer8] = useState("");
  const [player9, setPlayer9] = useState("");
  const [player10, setPlayer10] = useState("");
  const [player11, setPlayer11] = useState("");
  const [players, setPlayers] = useState([]);

  const navigate = useNavigate();

  // title
  useEffect(() => {
    document.title = "Weekly-Submission";
  }, []);

  useEffect(() => {
    const now = new Date();
    // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const currentDay = now.getDay();
    const currentHour = now.getHours();

    if (
      !(currentDay === 6 && currentHour >= 0 && currentHour <= 23) &&
      !(currentDay === 0 && currentHour >= 0 && currentHour <= 23) &&
      !(now.getDate() === 15 && now.getMonth() === 4 && currentHour >= 0 && currentHour <= 23) &&
      !(now.getDate() === 16 && now.getMonth() === 4 && currentHour >= 0 && currentHour <= 23)
    ) {
      toast.error(
        "This route is accessible only on Saturday and Sunday"
      );
      navigate("/home");
    }

  }, [navigate]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await instance.get("/squads", {
          headers: { Authorization: localStorage.getItem("auction") },
        });
        if (res.status === 200) {
          setPlayers(res.data.squads);
        }
      };
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, []);

  const handleClick = async () => {
    let xi = [];
    let notXi = [];
    let batters = 0;
    let bowlers = 0;
    let wk = 0;
    let all = 0;
    players.map((player) => {
      if (
        player.playerData.matchData._id === player1 ||
        player.playerData.matchData._id === player2 ||
        player.playerData.matchData._id === player3 ||
        player.playerData.matchData._id === player4 ||
        player.playerData.matchData._id === player5 ||
        player.playerData.matchData._id === player6 ||
        player.playerData.matchData._id === player7 ||
        player.playerData.matchData._id === player8 ||
        player.playerData.matchData._id === player9 ||
        player.playerData.matchData._id === player10 ||
        player.playerData.matchData._id === player11
      ) {
        player.playerData.playerType === "Batter" && batters++;
        player.playerData.playerType === "Bowler" && bowlers++;
        player.playerData.playerType === "Wicket-Keeper" && wk++;
        player.playerData.playerType === "All-Rounder" && all++;
        xi.push(player.playerData.matchData._id);
        return null;
      } else {
        notXi.push(player.playerData.matchData._id);
        return null;
      }
    });

    if (wk >= 1 && batters >= 2 && bowlers >= 3 && all >= 1) {
      try {
        const res = await instance.post(
          "/submission",
          { xi, notXi },
          {
            headers: { Authorization: localStorage.getItem("auction") },
          }
        );
        if (res.status === 200) {
          toast.success("Playing-XI changed");
          setPlayer1("");
          setPlayer2("");
          setPlayer3("");
          setPlayer4("");
          setPlayer5("");
          setPlayer6("");
          setPlayer7("");
          setPlayer8("");
          setPlayer9("");
          setPlayer10("");
          setPlayer11("");
        }
      } catch (error) {
        toast.error("Unable to change XI! Please try again later...");
      }
    } else {
      toast.error("You need min 1-W/K, 2-Batters, 3-Bowlers, 1-All Rounder & max 4 overseas players in XI");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center my-6">
        <h1 className="text-4xl mb-3 mt-6 text-neutral-700">
          Weekly Team Submission
        </h1>

        <div className="flex justify-center items-center flex-wrap">
          <div className="flex flex-col justify-center items-center w-[300px] m-6">
            <select
              onChange={(e) => setPlayer1(e.target.value)}
              className="h-14 w-full outline-none border-none text-neutral-700 bg-yellow-400 text-2xl rounded-tr-xl rounded-tl-xl pl-2"
            >
              <option value="" selected disabled hidden>
                Select Player-1
              </option>
              {players.map((player, index) => {
                if (
                  player.playerData.matchData._id === player2 ||
                  player.playerData.matchData._id === player3 ||
                  player.playerData.matchData._id === player4 ||
                  player.playerData.matchData._id === player5 ||
                  player.playerData.matchData._id === player6 ||
                  player.playerData.matchData._id === player7 ||
                  player.playerData.matchData._id === player8 ||
                  player.playerData.matchData._id === player9 ||
                  player.playerData.matchData._id === player10 ||
                  player.playerData.matchData._id === player11
                ) {
                  return null;
                } else {
                  return (
                    <option value={player.playerData.matchData._id} key={index}>
                      {player.playerData.playerName} -{" "}
                      {player.playerData.playerType}
                    </option>
                  );
                }
              })}
            </select>
            {/* <hr className="border-1 border-white w-full m-5" /> */}
            {player1 === "" ? (
              <span className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3">
                Not Selected - Not Selected
              </span>
            ) : (
              players.map((player, index) => {
                if (player.playerData.matchData._id === player1) {
                  return (
                    <span
                      key={index}
                      className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3"
                    >
                      {player.playerData.playerName} {" - "}
                      {player.playerData.playerType}
                    </span>
                  );
                } else {
                  return null;
                }
              })
            )}
          </div>

          <div className="flex flex-col justify-center items-center w-[300px] m-6">
            <select
              onChange={(e) => setPlayer2(e.target.value)}
              className="h-14 w-full outline-none border-none text-neutral-700 bg-yellow-400 text-2xl rounded-tr-xl rounded-tl-xl pl-2"
            >
              <option value="" selected disabled hidden>
                Select Player-2
              </option>
              {players.map((player, index) => {
                if (
                  player.playerData.matchData._id === player1 ||
                  player.playerData.matchData._id === player3 ||
                  player.playerData.matchData._id === player4 ||
                  player.playerData.matchData._id === player5 ||
                  player.playerData.matchData._id === player6 ||
                  player.playerData.matchData._id === player7 ||
                  player.playerData.matchData._id === player8 ||
                  player.playerData.matchData._id === player9 ||
                  player.playerData.matchData._id === player10 ||
                  player.playerData.matchData._id === player11
                ) {
                  return null;
                } else {
                  return (
                    <option value={player.playerData.matchData._id} key={index}>
                      {player.playerData.playerName} -{" "}
                      {player.playerData.playerType}
                    </option>
                  );
                }
              })}
            </select>
            {/* <hr className="border-1 border-white w-full m-5" /> */}
            {player2 === "" ? (
              <span className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3">
                Not Selected - Not Selected
              </span>
            ) : (
              players.map((player, index) => {
                if (player.playerData.matchData._id === player2) {
                  return (
                    <span
                      key={index}
                      className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3"
                    >
                      {player.playerData.playerName} {" - "}
                      {player.playerData.playerType}
                    </span>
                  );
                } else {
                  return null;
                }
              })
            )}
          </div>

          <div className="flex flex-col justify-center items-center w-[300px] m-6">
            <select
              onChange={(e) => setPlayer3(e.target.value)}
              className="h-14 w-full outline-none border-none text-neutral-700 bg-yellow-400 text-2xl rounded-tr-xl rounded-tl-xl pl-2"
            >
              <option value="" selected disabled hidden>
                Select Player-3
              </option>
              {players.map((player, index) => {
                if (
                  player.playerData.matchData._id === player1 ||
                  player.playerData.matchData._id === player2 ||
                  player.playerData.matchData._id === player4 ||
                  player.playerData.matchData._id === player5 ||
                  player.playerData.matchData._id === player6 ||
                  player.playerData.matchData._id === player7 ||
                  player.playerData.matchData._id === player8 ||
                  player.playerData.matchData._id === player9 ||
                  player.playerData.matchData._id === player10 ||
                  player.playerData.matchData._id === player11
                ) {
                  return null;
                } else {
                  return (
                    <option value={player.playerData.matchData._id} key={index}>
                      {player.playerData.playerName} -{" "}
                      {player.playerData.playerType}
                    </option>
                  );
                }
              })}
            </select>
            {/* <hr className="border-1 border-white w-full m-5" /> */}
            {player3 === "" ? (
              <span className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3">
                Not Selected - Not Selected
              </span>
            ) : (
              players.map((player, index) => {
                if (player.playerData.matchData._id === player3) {
                  return (
                    <span
                      key={index}
                      className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3"
                    >
                      {player.playerData.playerName} {" - "}
                      {player.playerData.playerType}
                    </span>
                  );
                } else {
                  return null;
                }
              })
            )}
          </div>
        </div>

        <div className="flex justify-center items-center flex-wrap">
          <div className="flex flex-col justify-center items-center w-[300px] m-6">
            <select
              onChange={(e) => setPlayer4(e.target.value)}
              className="h-14 w-full outline-none border-none text-neutral-700 bg-yellow-400 text-2xl rounded-tr-xl rounded-tl-xl pl-2"
            >
              <option value="" selected disabled hidden>
                Select Player-4
              </option>
              {players.map((player, index) => {
                if (
                  player.playerData.matchData._id === player1 ||
                  player.playerData.matchData._id === player2 ||
                  player.playerData.matchData._id === player3 ||
                  player.playerData.matchData._id === player5 ||
                  player.playerData.matchData._id === player6 ||
                  player.playerData.matchData._id === player7 ||
                  player.playerData.matchData._id === player8 ||
                  player.playerData.matchData._id === player9 ||
                  player.playerData.matchData._id === player10 ||
                  player.playerData.matchData._id === player11
                ) {
                  return null;
                } else {
                  return (
                    <option value={player.playerData.matchData._id} key={index}>
                      {player.playerData.playerName} -{" "}
                      {player.playerData.playerType}
                    </option>
                  );
                }
              })}
            </select>
            {/* <hr className="border-1 border-white w-full m-5" /> */}
            {player4 === "" ? (
              <span className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3">
                Not Selected - Not Selected
              </span>
            ) : (
              players.map((player, index) => {
                if (player.playerData.matchData._id === player4) {
                  return (
                    <span
                      key={index}
                      className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3"
                    >
                      {player.playerData.playerName} {" - "}
                      {player.playerData.playerType}
                    </span>
                  );
                } else {
                  return null;
                }
              })
            )}
          </div>

          <div className="flex flex-col justify-center items-center w-[300px] m-6">
            <select
              onChange={(e) => setPlayer5(e.target.value)}
              className="h-14 w-full outline-none border-none text-neutral-700 bg-yellow-400 text-2xl rounded-tr-xl rounded-tl-xl pl-2"
            >
              <option value="" selected disabled hidden>
                Select Player-5
              </option>
              {players.map((player, index) => {
                if (
                  player.playerData.matchData._id === player1 ||
                  player.playerData.matchData._id === player2 ||
                  player.playerData.matchData._id === player3 ||
                  player.playerData.matchData._id === player4 ||
                  player.playerData.matchData._id === player6 ||
                  player.playerData.matchData._id === player7 ||
                  player.playerData.matchData._id === player8 ||
                  player.playerData.matchData._id === player9 ||
                  player.playerData.matchData._id === player10 ||
                  player.playerData.matchData._id === player11
                ) {
                  return null;
                } else {
                  return (
                    <option value={player.playerData.matchData._id} key={index}>
                      {player.playerData.playerName} -{" "}
                      {player.playerData.playerType}
                    </option>
                  );
                }
              })}
            </select>
            {/* <hr className="border-1 border-white w-full m-5" /> */}
            {player5 === "" ? (
              <span className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3">
                Not Selected - Not Selected
              </span>
            ) : (
              players.map((player, index) => {
                if (player.playerData.matchData._id === player5) {
                  return (
                    <span
                      key={index}
                      className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3"
                    >
                      {player.playerData.playerName} {" - "}
                      {player.playerData.playerType}
                    </span>
                  );
                } else {
                  return null;
                }
              })
            )}
          </div>

          <div className="flex flex-col justify-center items-center w-[300px] m-6">
            <select
              onChange={(e) => setPlayer6(e.target.value)}
              className="h-14 w-full outline-none border-none text-neutral-700 bg-yellow-400 text-2xl rounded-tr-xl rounded-tl-xl pl-2"
            >
              <option value="" selected disabled hidden>
                Select Player-6
              </option>
              {players.map((player, index) => {
                if (
                  player.playerData.matchData._id === player1 ||
                  player.playerData.matchData._id === player2 ||
                  player.playerData.matchData._id === player3 ||
                  player.playerData.matchData._id === player4 ||
                  player.playerData.matchData._id === player5 ||
                  player.playerData.matchData._id === player7 ||
                  player.playerData.matchData._id === player8 ||
                  player.playerData.matchData._id === player9 ||
                  player.playerData.matchData._id === player10 ||
                  player.playerData.matchData._id === player11
                ) {
                  return null;
                } else {
                  return (
                    <option value={player.playerData.matchData._id} key={index}>
                      {player.playerData.playerName} -{" "}
                      {player.playerData.playerType}
                    </option>
                  );
                }
              })}
            </select>
            {/* <hr className="border-1 border-white w-full m-5" /> */}
            {player6 === "" ? (
              <span className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3">
                Not Selected - Not Selected
              </span>
            ) : (
              players.map((player, index) => {
                if (player.playerData.matchData._id === player6) {
                  return (
                    <span
                      key={index}
                      className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3"
                    >
                      {player.playerData.playerName} {" - "}
                      {player.playerData.playerType}
                    </span>
                  );
                } else {
                  return null;
                }
              })
            )}
          </div>
        </div>

        <div className="flex justify-center items-center flex-wrap">
          <div className="flex flex-col justify-center items-center w-[300px] m-6">
            <select
              onChange={(e) => setPlayer7(e.target.value)}
              className="h-14 w-full outline-none border-none text-neutral-700 bg-yellow-400 text-2xl rounded-tr-xl rounded-tl-xl pl-2"
            >
              <option value="" selected disabled hidden>
                Select Player-7
              </option>
              {players.map((player, index) => {
                if (
                  player.playerData.matchData._id === player1 ||
                  player.playerData.matchData._id === player2 ||
                  player.playerData.matchData._id === player3 ||
                  player.playerData.matchData._id === player4 ||
                  player.playerData.matchData._id === player5 ||
                  player.playerData.matchData._id === player6 ||
                  player.playerData.matchData._id === player8 ||
                  player.playerData.matchData._id === player9 ||
                  player.playerData.matchData._id === player10 ||
                  player.playerData.matchData._id === player11
                ) {
                  return null;
                } else {
                  return (
                    <option value={player.playerData.matchData._id} key={index}>
                      {player.playerData.playerName} -{" "}
                      {player.playerData.playerType}
                    </option>
                  );
                }
              })}
            </select>
            {/* <hr className="border-1 border-white w-full m-5" /> */}
            {player7 === "" ? (
              <span className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3">
                Not Selected - Not Selected
              </span>
            ) : (
              players.map((player, index) => {
                if (player.playerData.matchData._id === player7) {
                  return (
                    <span
                      key={index}
                      className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3"
                    >
                      {player.playerData.playerName} {" - "}
                      {player.playerData.playerType}
                    </span>
                  );
                } else {
                  return null;
                }
              })
            )}
          </div>

          <div className="flex flex-col justify-center items-center w-[300px] m-6">
            <select
              onChange={(e) => setPlayer8(e.target.value)}
              className="h-14 w-full outline-none border-none text-neutral-700 bg-yellow-400 text-2xl rounded-tr-xl rounded-tl-xl pl-2"
            >
              <option value="" selected disabled hidden>
                Select Player-8
              </option>
              {players.map((player, index) => {
                if (
                  player.playerData.matchData._id === player1 ||
                  player.playerData.matchData._id === player2 ||
                  player.playerData.matchData._id === player3 ||
                  player.playerData.matchData._id === player4 ||
                  player.playerData.matchData._id === player5 ||
                  player.playerData.matchData._id === player6 ||
                  player.playerData.matchData._id === player7 ||
                  player.playerData.matchData._id === player9 ||
                  player.playerData.matchData._id === player10 ||
                  player.playerData.matchData._id === player11
                ) {
                  return null;
                } else {
                  return (
                    <option value={player.playerData.matchData._id} key={index}>
                      {player.playerData.playerName} -{" "}
                      {player.playerData.playerType}
                    </option>
                  );
                }
              })}
            </select>
            {/* <hr className="border-1 border-white w-full m-5" /> */}
            {player8 === "" ? (
              <span className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3">
                Not Selected - Not Selected
              </span>
            ) : (
              players.map((player, index) => {
                if (player.playerData.matchData._id === player8) {
                  return (
                    <span
                      key={index}
                      className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3"
                    >
                      {player.playerData.playerName} {" - "}
                      {player.playerData.playerType}
                    </span>
                  );
                } else {
                  return null;
                }
              })
            )}
          </div>

          <div className="flex flex-col justify-center items-center w-[300px] m-6">
            <select
              onChange={(e) => setPlayer9(e.target.value)}
              className="h-14 w-full outline-none border-none text-neutral-700 bg-yellow-400 text-2xl rounded-tr-xl rounded-tl-xl pl-2"
            >
              <option value="" selected disabled hidden>
                Select Player-9
              </option>
              {players.map((player, index) => {
                if (
                  player.playerData.matchData._id === player1 ||
                  player.playerData.matchData._id === player2 ||
                  player.playerData.matchData._id === player3 ||
                  player.playerData.matchData._id === player4 ||
                  player.playerData.matchData._id === player5 ||
                  player.playerData.matchData._id === player6 ||
                  player.playerData.matchData._id === player7 ||
                  player.playerData.matchData._id === player8 ||
                  player.playerData.matchData._id === player10 ||
                  player.playerData.matchData._id === player11
                ) {
                  return null;
                } else {
                  return (
                    <option value={player.playerData.matchData._id} key={index}>
                      {player.playerData.playerName} -{" "}
                      {player.playerData.playerType}
                    </option>
                  );
                }
              })}
            </select>
            {/* <hr className="border-1 border-white w-full m-5" /> */}
            {player9 === "" ? (
              <span className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3">
                Not Selected - Not Selected
              </span>
            ) : (
              players.map((player, index) => {
                if (player.playerData.matchData._id === player9) {
                  return (
                    <span
                      key={index}
                      className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3"
                    >
                      {player.playerData.playerName} {" - "}
                      {player.playerData.playerType}
                    </span>
                  );
                } else {
                  return null;
                }
              })
            )}
          </div>
        </div>

        <div className="flex justify-center items-center flex-wrap">
          <div className="flex flex-col justify-center items-center w-[300px] m-6">
            <select
              onChange={(e) => setPlayer10(e.target.value)}
              className="h-14 w-full outline-none border-none text-neutral-700 bg-yellow-400 text-2xl rounded-tr-xl rounded-tl-xl pl-2"
            >
              <option value="" selected disabled hidden>
                Select Player-10
              </option>
              {players.map((player, index) => {
                if (
                  player.playerData.matchData._id === player1 ||
                  player.playerData.matchData._id === player2 ||
                  player.playerData.matchData._id === player3 ||
                  player.playerData.matchData._id === player4 ||
                  player.playerData.matchData._id === player5 ||
                  player.playerData.matchData._id === player6 ||
                  player.playerData.matchData._id === player7 ||
                  player.playerData.matchData._id === player8 ||
                  player.playerData.matchData._id === player9 ||
                  player.playerData.matchData._id === player11
                ) {
                  return null;
                } else {
                  return (
                    <option value={player.playerData.matchData._id} key={index}>
                      {player.playerData.playerName} -{" "}
                      {player.playerData.playerType}
                    </option>
                  );
                }
              })}
            </select>
            {/* <hr className="border-1 border-white w-full m-5" /> */}
            {player10 === "" ? (
              <span className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3">
                Not Selected - Not Selected
              </span>
            ) : (
              players.map((player, index) => {
                if (player.playerData.matchData._id === player10) {
                  return (
                    <span
                      key={index}
                      className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3"
                    >
                      {player.playerData.playerName} {" - "}
                      {player.playerData.playerType}
                    </span>
                  );
                } else {
                  return null;
                }
              })
            )}
          </div>

          <div className="flex flex-col justify-center items-center w-[300px] m-6">
            <select
              onChange={(e) => setPlayer11(e.target.value)}
              className="h-14 w-full outline-none border-none text-neutral-700 bg-yellow-400 text-2xl rounded-tr-xl rounded-tl-xl pl-2"
            >
              <option value="" selected disabled hidden>
                Select Player-11
              </option>
              {players.map((player, index) => {
                if (
                  player.playerData.matchData._id === player1 ||
                  player.playerData.matchData._id === player2 ||
                  player.playerData.matchData._id === player3 ||
                  player.playerData.matchData._id === player4 ||
                  player.playerData.matchData._id === player5 ||
                  player.playerData.matchData._id === player6 ||
                  player.playerData.matchData._id === player7 ||
                  player.playerData.matchData._id === player8 ||
                  player.playerData.matchData._id === player9 ||
                  player.playerData.matchData._id === player10
                ) {
                  return null;
                } else {
                  return (
                    <option value={player.playerData.matchData._id} key={index}>
                      {player.playerData.playerName} -{" "}
                      {player.playerData.playerType}
                    </option>
                  );
                }
              })}
            </select>
            {/* <hr className="border-1 border-white w-full m-5" /> */}
            {player11 === "" ? (
              <span className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3">
                Not Selected - Not Selected
              </span>
            ) : (
              players.map((player, index) => {
                if (player.playerData.matchData._id === player11) {
                  return (
                    <span
                      key={index}
                      className="text-2xl text-white h-14 bg-neutral-700 rounded-br-xl rounded-bl-xl w-full text-center pt-3"
                    >
                      {player.playerData.playerName} {" - "}
                      {player.playerData.playerType}
                    </span>
                  );
                } else {
                  return null;
                }
              })
            )}
          </div>
        </div>

        <button
          onClick={handleClick}
          className="h-14 w-[300px] bg-yellow-400 border-none outline-none mb-6 text-2xl text-neutral-700 hover:italic rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default WeeklyTeams;
