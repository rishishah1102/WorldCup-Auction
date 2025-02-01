import React, { useEffect, useState } from "react";

// component
import DataTable from "react-data-table-component";

// icons
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
// import players from "../utils/players";

// toast
import { toast } from "react-toastify";

// axios
import instance from "../utils/axios";

function Squads() {
  const [aucplayers, setAucPlayers] = useState([]);
  const [squad, setSquad] = useState([]);
  const [name, setName] = useState("");
  const [purse, setPurse] = useState(0);

  const columns = [
    {
      name: <span className="text-2xl font-normal">S No.</span>,
      selector: (row, index) => row.playerData.playerNumber,
      cell: (row, index) => row.playerData.playerNumber,
      sortable: true,
      center: true,
    },
    {
      name: <span className="text-2xl font-normal">Name</span>,
      selector: (row) => row.playerData.playerName,
      sortable: true,
      center: true,
      cell: (row) => (
        <span>
          {row.playerData.country === "India" ? (
            row.playerData.playerName
          ) : (
            <>
              {row.playerData.playerName}{" "}
              <span className="">
                <AirplanemodeActiveIcon />
              </span>
            </>
          )}
        </span>
      ),
    },
    {
      name: <span className="text-2xl font-normal">Country</span>,
      selector: (row) => row.playerData.country,
      sortable: true,
      center: true,
      cell: (row) => <span>{row.playerData.country}</span>,
    },
    {
      name: <span className="text-2xl font-normal">Type</span>,
      selector: (row) => row.playerData.playerType,
      sortable: false,
      center: true,
      cell: (row) => (
        <span
          className={`
          ${
            row.playerData.playerType === "Batter" &&
            "bg-blue-400 text-white p-2 font-semibold rounded-md"
          }
          ${
            row.playerData.playerType === "Bowler" &&
            "bg-gray-500 text-white p-2 font-semibold rounded-md"
          }
          ${
            row.playerData.playerType === "Wicket-Keeper" &&
            "bg-orange-600 text-white p-2 font-semibold rounded-md"
          }
          ${
            row.playerData.playerType === "All-Rounder" &&
            "bg-green-600 text-white p-2 font-semibold rounded-md"
          }
          `}
        >
          {row.playerData.playerType}
        </span>
      ),
    },
    {
      name: <span className="text-2xl font-normal">Current-XI</span>,
      selector: (row) => row.playerData.matchData.currentX1,
      sortable: true,
      center: true,
      cell: (row) =>
        row.playerData.matchData.currentX1 ? (
          <span style={{ color: "green" }}>
            <NorthIcon />
          </span>
        ) : (
          <span style={{ color: "red" }}>
            <SouthIcon />
          </span>
        ),
    },
    {
      name: <span className="text-2xl font-normal">Next-XI</span>,
      selector: (row) => row.playerData.matchData.nextX1,
      sortable: false,
      center: true,
      cell: (row) =>
        row.playerData.matchData.nextX1 ? (
          <span style={{ color: "green" }}>
            <NorthIcon />
          </span>
        ) : (
          <span style={{ color: "red" }}>
            <SouthIcon />
          </span>
        ),
    },
    {
      name: <span className="text-2xl font-normal">IPL Team</span>,
      selector: (row) => row.playerData.iplTeam,
      sortable: true,
      center: true,
      cell: (row) => <span>{row.playerData.iplTeam}</span>,
    },
    {
      name: <span className="text-2xl font-normal">Base Price</span>,
      selector: (row) => row.playerData.basePrice,
      sortable: true,
      center: true,
      cell: (row) => <span>{row.playerData.basePrice} Cr</span>,
    },
    {
      name: <span className="text-2xl font-normal">Selling Price</span>,
      selector: (row) => row.playerData.sellingPrice,
      sortable: true,
      center: true,
      cell: (row) => <span>{row.playerData.sellingPrice} Cr</span>,
    },
  ];

  // title
  useEffect(() => {
    document.title = "Squads";
  }, []);

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

  // my name
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await instance.get("/home", {
          headers: { Authorization: localStorage.getItem("auction") },
        });
        if (res.status === 200) {
          setName(res.data.foundUser.username);
        }
      };
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, []);

  // my squad
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await instance.get("/squads", {
          headers: { Authorization: localStorage.getItem("auction") },
        });
        if (res.status === 200) {
          setSquad(res.data.squads);
          setPurse(res.data.purse);
        }
      };
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, []);

  // other squad
  const handleClick = async (name, email) => {
    try {
      const res = await instance.post(
        "/squads",
        { email: email },
        {
          headers: { Authorization: localStorage.getItem("auction") },
        }
      );
      if (res.status === 200) {
        setName(name);
        setSquad(res.data.squads);
        setPurse(res.data.purse);
      }
    } catch (error) {
      toast.error("Error in fetching the data");
    }
  };

  return (
    <div
      className="w-screen flex flex-col justify-center items-center overflow-y-auto"
      // style={{ height: "calc(100vh - 112px - 56px)" }}
    >
      {/* buttons */}
      <div className="w-[90%] flex justify-evenly items-center mt-5 mb-2 bg-neutral-200 p-4 rounded-md flex-wrap">
        {aucplayers.map((player, index) => {
          return (
            <button
              className="bg-blue-600 border-none outline-none text-white text-2xl h-12 my-2 w-36 rounded-lg transition-all duration-300 ease-in-out hover:tracking-wider"
              onClick={() => handleClick(player.teamname, player.email)}
              key={index}
            >
              {player.teamname}
            </button>
          );
        })}
      </div>

      {/* list of players */}
      <div className="w-[90%] m-4 shadow-black shadow-3xl rounded-md">
        <DataTable
          className="w-full text-2xl"
          columns={columns}
          data={squad}
          pagination
          paginationPerPage={25}
          paginationRowsPerPageOptions={[25]}
          striped
          fixedHeader
          fixedHeaderScrollHeight="480px"
          subHeader
          subHeaderComponent={
            <div className="flex justify-between items-center w-screen flex-wrap">
              {/* heading */}
              <h3 className="text-3xl font-bold">{name}</h3>
              <h3 className="text-3xl font-bold">
                Purse Remaining - {100 - purse} Cr
              </h3>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default Squads;
