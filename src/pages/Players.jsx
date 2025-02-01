import React, { useEffect, useState } from "react";

// css
import "../styles/players.css";

// component
import DataTable from "react-data-table-component";

// icons
import SearchIcon from "@mui/icons-material/Search";

// toast
import { toast } from "react-toastify";

// axios
import instance from "../utils/axios";

function Players() {
  const [player, setPlayer] = useState([]);
  const [filteredplayer, setFilteredPlayer] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // title
  useEffect(() => {
    document.title = "Players";
  }, []);

  // fetching the players
  useEffect(() => {
    const fetchData = async () => {
      try {
        // axios req
        const res = await instance.get("/players", {
          headers: { Authorization: localStorage.getItem("auction") },
        });
        if (res.status === 200) {
          // console.log(res.data.foundPlayers);
          setPlayer(res.data.foundPlayers);
          setFilteredPlayer(res.data.foundPlayers);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchData();
  }, []);

  // filerdata
  useEffect(() => {
    const filterData = () => {
      const filter = player?.filter(
        (play) =>
          play?.playerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          play?.country?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          play?.playerType?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlayer(filter);
    };
    filterData();
  }, [searchQuery, player]);

  const columns = [
    {
      name: <span className="text-2xl font-normal">S No.</span>,
      selector: (row) => row.playerNumber,
      cell: (row) => row.playerNumber,
      sortable: true,
      center: true,
    },
    {
      name: <span className="text-2xl font-normal">Name</span>,
      selector: (row) => row.playerName,
      sortable: true,
      center: true,
      cell: (row) => <span>{row.playerName}</span>,
    },
    {
      name: <span className="text-2xl font-normal">Country</span>,
      selector: (row) => row.country,
      sortable: true,
      center: true,
      cell: (row) => <span>{row.country}</span>,
    },
    {
      name: <span className="text-2xl font-normal">Type</span>,
      selector: (row) => row.playerType,
      sortable: true,
      center: true,
      cell: (row) => (
        <span
          className={`
          ${
            row.playerType === "Batter" &&
            "bg-blue-400 text-white p-2 font-semibold rounded-md"
          }
          ${
            row.playerType === "Bowler" &&
            "bg-gray-500 text-white p-2 font-semibold rounded-md"
          }
          ${
            row.playerType === "Wicket-Keeper" &&
            "bg-orange-600 text-white p-2 font-semibold rounded-md"
          }
          ${
            row.playerType === "All-Rounder" &&
            "bg-green-600 text-white p-2 font-semibold rounded-md"
          }
          `}
        >
          {row.playerType}
        </span>
      ),
    },
    {
      name: <span className="text-2xl font-normal">IPL Team</span>,
      selector: (row) => row.iplTam,
      sortable: true,
      center: true,
      cell: (row) => <span>{row.iplTeam}</span>,
    },
    {
      name: <span className="text-2xl font-normal">Prev Team</span>,
      selector: (row) => row.prevTeam,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.prevTeam}</span>,
    },
    {
      name: <span className="text-2xl font-normal">Prev Fantasy Pts.</span>,
      selector: (row) => row.prevFantasyPoints,
      sortable: true,
      center: true,
      cell: (row) => <span>{row.prevFantasyPoints}</span>,
    },
    {
      name: <span className="text-2xl font-normal">Base Price</span>,
      selector: (row) => row.basePrice,
      sortable: true,
      center: true,
      cell: (row) => <span>{row.basePrice} Cr</span>,
    },
    {
      name: <span className="text-2xl font-normal">Selling Price</span>,
      selector: (row) => row.sellingPrice,
      sortable: true,
      center: true,
      cell: (row) => <span>{row.sellingPrice} Cr</span>,
    },
    {
      name: <span className="text-2xl font-normal">Hammer</span>,
      selector: (row) => row.sold,
      sortable: true,
      center: true,
      cell: (row) => <span>{row.sold ? "True" : "False"}</span>,
    },
    {
      name: <span className="text-2xl font-normal">Hammer</span>,
      selector: (row) => row.unsold,
      sortable: true,
      center: true,
      cell: (row) => <span>{row.unsold ? "True" : "False"}</span>,
    },
  ];

  return (
    <div className="">
      <div className="w-screen">
        <DataTable
          className="w-full text-2xl"
          columns={columns}
          data={filteredplayer}
          pagination
          paginationRowsPerPageOptions={[5, 10, 25, 50, 100, 150, 200, 250]}
          striped
          fixedHeader
          fixedHeaderScrollHeight="528px"
          subHeader
          subHeaderComponent={
            <div className="flex justify-between items-center w-screen">
              {/* heading */}
              <h3 className="text-3xl font-bold">Total Players</h3>

              {/* Search */}
              <div className="bg-blue-600 rounded-md">
                <input
                  className="bg-blue-600 border-none outline-none p-[8px] text-2xl text-white rounded-tl-md rounded-bl-md placeholder:text-white"
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="p-[8px] text-white">
                  <SearchIcon className="mb-2" style={{ fontSize: "20px" }} />
                </span>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default Players;
