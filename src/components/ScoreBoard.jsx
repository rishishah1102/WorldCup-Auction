import React, { useState, useEffect } from "react";

// component
import DataTable from "react-data-table-component";

// icons
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import SearchIcon from "@mui/icons-material/Search";

function ScoreBoard({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredplayer, setFilteredPlayer] = useState(data);

  const columns = [
    {
      name: <span className="text-2xl font-normal">Name</span>,
      selector: (row) => row.name,
      sortable: true,
      center: true,
      cell: (row) => (
        <span>
          {row.country === "India" ? (
            row.name
          ) : (
            <>
              {row.name}{" "}
              <span className="">
                <AirplanemodeActiveIcon />
              </span>
            </>
          )}
        </span>
      ),
      minWidth: "170px",
    },
    {
      name: <span className="text-2xl font-normal">Team</span>,
      selector: (row) => row.username,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.username}</span>,
      minWidth: "100px",
    },
    {
      name: <span className="text-2xl font-normal">XI</span>,
      selector: (row) => row.currentX1,
      sortable: false,
      center: true,
      cell: (row) => (
        <span>
          {row.matchData.currentX1 ? (
            <span style={{ color: "green" }}>
              <NorthIcon />
            </span>
          ) : (
            <span style={{ color: "red" }}>
              <SouthIcon />
            </span>
          )}
        </span>
      ),
      minWidth: "40px",
    },
    {
      name: <span className="text-2xl font-normal">M-1</span>,
      selector: (row) => row.matchData.match1,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.matchData.match1}</span>,
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">M-2</span>,
      selector: (row) => row.matchData.match2,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.matchData.match2}</span>,
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">M-3</span>,
      selector: (row) => row.matchData.match3,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.matchData.match3}</span>,
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">M-4</span>,
      selector: (row) => row.matchData.match4,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.matchData.match4}</span>,
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">M-5</span>,
      selector: (row) => row.matchData.match5,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.matchData.match5}</span>,
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">M-6</span>,
      selector: (row) => row.matchData.match6,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.matchData.match6}</span>,
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">M-7</span>,
      selector: (row) => row.matchData.match7,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.matchData.match7}</span>,
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">M-8</span>,
      selector: (row) => row.matchData.match8,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.matchData.match8}</span>,
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">M-9</span>,
      selector: (row) => row.matchData.match9,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.matchData.match9}</span>,
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">M-10</span>,
      selector: (row) => row.matchData.match10,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.matchData.match10}</span>,
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">P.W.T</span>,
      selector: (row) => row.matchData.prevTotalPoints,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.matchData.prevTotalPoints}</span>,
      minWidth: "120px",
    },
    {
      name: <span className="text-2xl font-normal">Total</span>,
      selector: (row) => row.matchData.totalPoints,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.matchData.totalPoints}</span>,
      minWidth: "120px",
    },
  ];

  // filerdata
  useEffect(() => {
    const filterData = () => {
      const filter = data?.filter((play) =>
        play.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlayer(filter);
    };
    filterData();
  }, [searchQuery, data]);

  return (
    <div>
      <DataTable
        className="w-full text-2xl"
        columns={columns}
        data={filteredplayer}
        pagination
        paginationPerPage={25}
        paginationRowsPerPageOptions={[25, 50, 75, 100]}
        striped
        fixedHeader
        fixedHeaderScrollHeight="540px"
        subHeader
        subHeaderComponent={
          <div className="flex justify-between items-center w-screen flex-wrap">
            {/* heading */}
            <h3 className="text-3xl font-bold my-2">Player ScoreBoard</h3>

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
  );
}

export default ScoreBoard;
