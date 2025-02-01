import React from "react";

// component
import DataTable from "react-data-table-component";

function LeaderBoard({ data }) {
  const leaderBoardColumns = [
    {
      name: <span className="text-2xl font-normal">S No.</span>,
      selector: (row, index) => index,
      cell: (row, index) => index + 1,
      sortable: true,
      center: true,
    },
    {
      name: <span className="text-2xl font-normal">Name</span>,
      selector: (row) => row.name,
      sortable: true,
      center: true,
      cell: (row) => <span>{row.name}</span>,
    },
    {
      name: <span className="text-2xl font-normal">Earned Points</span>,
      selector: (row) => row.ep,
      sortable: true,
      center: true,
      cell: (row) => <span>{row.ep}</span>,
    },
    {
      name: <span className="text-2xl font-normal">Benched Points</span>,
      selector: (row) => row.bep,
      sortable: true,
      center: true,
      cell: (row) => <span>{row.bep}</span>,
    },
  ];

  return (
    <div>
      <DataTable
        className="w-full text-2xl"
        columns={leaderBoardColumns}
        data={data}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10]}
        striped
        fixedHeader
        fixedHeaderScrollHeight="540px"
        subHeader
        subHeaderComponent={
          <div className="flex justify-between items-center w-screen flex-wrap">
            {/* heading */}
            <h3 className="text-3xl font-bold">LeaderBoard</h3>
          </div>
        }
      />
    </div>
  );
}

export default LeaderBoard;
