import React from "react";

// component
import DataTable from "react-data-table-component";

// icons
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

function PlayerScoreCard({ data }) {
  const columns = [
    {
      name: <span className="text-2xl font-normal">No.</span>,
      selector: (row, index) => index,
      cell: (row, index) => index + 1,
      sortable: true,
      center: true,
      minWidth: "70px",
    },
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
      minWidth: "145px",
    },
    {
      name: <span className="text-2xl font-normal">XI</span>,
      selector: (row) => row.matchData.currentX1,
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
      name: <span className="text-2xl font-normal">P.E.P</span>,
      selector: (row) => row.matchData.prevEarnedPoints,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.matchData.prevEarnedPoints}</span>,
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">P.Be.P</span>,
      selector: (row) => row.matchData.prevBenchedPoints,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.matchData.prevBenchedPoints}</span>,
      minWidth: "80px",
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
      name: <span className="text-2xl font-normal">E.P.</span>,
      selector: (row) => row.matchData.earnedPoints,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.matchData.earnedPoints}</span>,
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">B.P.</span>,
      selector: (row) => row.matchData.benchedPoints,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.matchData.benchedPoints}</span>,
      minWidth: "80px",
    },
  ];

  return (
    <div>
      <DataTable
        className="w-full text-2xl"
        columns={columns}
        data={data.playerscores}
        pagination
        paginationPerPage={25}
        paginationRowsPerPageOptions={[25]}
        striped
        fixedHeader
        fixedHeaderScrollHeight="680px"
        subHeader
        subHeaderComponent={
          <div className="flex justify-between items-center w-screen flex-wrap">
            {/* heading */}
            <h3 className="text-3xl font-bold my-2">
              {data.playerscores[0]?.teamname}
            </h3>

            {/* Search */}
            <div className="flex flex-wrap">
              <div className="bg-blue-600 rounded-md mr-2 my-1">
                <input
                  className="bg-blue-600 border-none outline-none p-[8px] text-2xl text-white rounded-md w-60 text-center"
                  type="text"
                  readOnly
                  value={`Total E.P. = ${data.totalEp}`}
                />
              </div>
              <div className="bg-blue-600 rounded-md my-1">
                <input
                  className="bg-blue-600 border-none outline-none p-[8px] text-2xl text-white rounded-md  w-60 text-center"
                  type="text"
                  readOnly
                  value={`Total Be.P. = ${data.totalBp}`}
                />
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default PlayerScoreCard;
