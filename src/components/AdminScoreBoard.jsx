import React, { useState, useEffect } from "react";

// component
import DataTable from "react-data-table-component";

// toat
import { toast } from "react-toastify";

// axios
import instance from "../utils/axios";

// icons
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const initialValues = {
  match1: 0,
  match2: 0,
  match3: 0,
  match4: 0,
  match5: 0,
  match6: 0,
  match7: 0,
  match8: 0,
  match9: 0,
  match10: 0,
};

function AdminScoreBoard({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredplayer, setFilteredPlayer] = useState(data);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  const [editedData, setEditedData] = useState(initialValues);

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
      cell: (row, index) =>
        edit && id === index ? (
          <input
            type="number"
            id="match1"
            className={`w-full h-8 ${
              edit && "focus: border-blue-600 border-2 p-2 h-10 rounded"
            }`}
            value={editedData.match1}
            onChange={handlechange}
            autoComplete="off"
          />
        ) : (
          <span>{row.matchData.match1}</span>
        ),
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">M-2</span>,
      selector: (row) => row.matchData.match2,
      sortable: false,
      center: true,
      cell: (row, index) =>
        edit && id === index ? (
          <input
            type="number"
            id="match2"
            className={`w-full h-8 ${
              edit && "focus: border-blue-600 border-2 p-2 h-10 rounded"
            }`}
            value={editedData.match2}
            onChange={handlechange}
            autoComplete="off"
          />
        ) : (
          <span>{row.matchData.match2}</span>
        ),
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">M-3</span>,
      selector: (row) => row.matchData.match3,
      sortable: false,
      center: true,
      cell: (row, index) =>
        edit && id === index ? (
          <input
            type="number"
            id="match3"
            className={`w-full h-8 ${
              edit && "focus: border-blue-600 border-2 p-2 h-10 rounded"
            }`}
            value={editedData.match3}
            onChange={handlechange}
            autoComplete="off"
          />
        ) : (
          <span>{row.matchData.match3}</span>
        ),
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">M-4</span>,
      selector: (row) => row.matchData.match4,
      sortable: false,
      center: true,
      cell: (row, index) =>
        edit && id === index ? (
          <input
            type="number"
            id="match4"
            className={`w-full h-8 ${
              edit && "focus: border-blue-600 border-2 p-2 h-10 rounded"
            }`}
            value={editedData.match4}
            onChange={handlechange}
            autoComplete="off"
          />
        ) : (
          <span>{row.matchData.match4}</span>
        ),
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">M-5</span>,
      selector: (row) => row.matchData.match5,
      sortable: false,
      center: true,
      cell: (row, index) =>
        edit && id === index ? (
          <input
            type="number"
            id="match5"
            className={`w-full h-8 ${
              edit && "focus: border-blue-600 border-2 p-2 h-10 rounded"
            }`}
            value={editedData.match5}
            onChange={handlechange}
            autoComplete="off"
          />
        ) : (
          <span>{row.matchData.match5}</span>
        ),
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">M-6</span>,
      selector: (row) => row.matchData.match6,
      sortable: false,
      center: true,
      cell: (row, index) =>
        edit && id === index ? (
          <input
            type="number"
            id="match6"
            className={`w-full h-8 ${
              edit && "focus: border-blue-600 border-2 p-2 h-10 rounded"
            }`}
            value={editedData.match6}
            onChange={handlechange}
            autoComplete="off"
          />
        ) : (
          <span>{row.matchData.match6}</span>
        ),
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">M-7</span>,
      selector: (row) => row.matchData.match7,
      sortable: false,
      center: true,
      cell: (row, index) =>
        edit && id === index ? (
          <input
            type="number"
            id="match7"
            className={`w-full h-8 ${
              edit && "focus: border-blue-600 border-2 p-2 h-10 rounded"
            }`}
            value={editedData.match7}
            onChange={handlechange}
            autoComplete="off"
          />
        ) : (
          <span>{row.matchData.match7}</span>
        ),
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">M-8</span>,
      selector: (row) => row.matchData.match8,
      sortable: false,
      center: true,
      cell: (row, index) =>
        edit && id === index ? (
          <input
            type="number"
            id="match8"
            className={`w-full h-8 ${
              edit && "focus: border-blue-600 border-2 p-2 h-10 rounded"
            }`}
            value={editedData.match8}
            onChange={handlechange}
            autoComplete="off"
          />
        ) : (
          <span>{row.matchData.match8}</span>
        ),
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">M-9</span>,
      selector: (row) => row.matchData.match9,
      sortable: false,
      center: true,
      cell: (row, index) =>
        edit && id === index ? (
          <input
            type="number"
            id="match9"
            className={`w-full h-8 ${
              edit && "focus: border-blue-600 border-2 p-2 h-10 rounded"
            }`}
            value={editedData.match9}
            onChange={handlechange}
            autoComplete="off"
          />
        ) : (
          <span>{row.matchData.match9}</span>
        ),
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">M-10</span>,
      selector: (row) => row.matchData.match10,
      sortable: false,
      center: true,
      cell: (row, index) =>
        edit && id === index ? (
          <input
            type="number"
            id="match10"
            className={`w-full h-8 ${
              edit && "focus: border-blue-600 border-2 p-2 h-10 rounded"
            }`}
            value={editedData.match10}
            onChange={handlechange}
            autoComplete="off"
          />
        ) : (
          <span>{row.matchData.match10}</span>
        ),
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">P.W.T</span>,
      selector: (row) => row.matchData.prevTotalPoints,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.matchData.prevTotalPoints}</span>,
      minWidth: "80px",
    },
    {
      name: <span className="text-2xl font-normal">Total</span>,
      selector: (row) => row.matchData.totalPoints,
      sortable: false,
      center: true,
      cell: (row) => <span>{row.matchData.totalPoints}</span>,
      minWidth: "80px",
    },
    {
      cell: (row, index) => (
        <span className="w-full flex justify-evenly">
          {edit && id === index ? (
            <>
              <span
                className="text-gray-600 cursor-pointer hover:bg-gray-300 hover:rounded-2xl hover:p-[1px]"
                onClick={() => {
                  saveEdit(row, index);
                }}
              >
                <CheckIcon style={{ fontSize: "20px" }} />
              </span>
              <span
                className="text-gray-600 cursor-pointer hover:bg-gray-300 hover:rounded-2xl hover:p-[1px]"
                onClick={() => {
                  cancelEdit(index);
                }}
              >
                <CloseIcon style={{ fontSize: "20px" }} />
              </span>
            </>
          ) : (
            <>
              <span
                className="text-gray-600 cursor-pointer hover:bg-gray-300 hover:rounded-2xl hover:p-[3px]"
                onClick={() => {
                  handleEdit(row, index);
                }}
              >
                <BorderColorIcon style={{ fontSize: "15px" }} />
              </span>
            </>
          )}
        </span>
      ),
      minWidth: "40px",
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

  const handlechange = (e) => {
    const { id, value } = e.target;
    setEditedData({ ...editedData, [id]: value });
  };

  const saveEdit = async (row, index) => {
    if (edit && id === index) {
      let mid = row.matchData._id;
      const updatedScore = {
        ...editedData,
        mid: mid,
      };
      try {
        const res = await instance.post("/updatescores", updatedScore, {
          headers: { Authorization: localStorage.getItem("auction") },
        });
        if (res.status === 200) {
          setEdit(false);
          setId(0);
          setEditedData(initialValues);
          const getData = await instance.get("/scoreboard", {
            headers: { Authorization: localStorage.getItem("auction") },
          });
          if (getData.status === 200) {
            setFilteredPlayer(getData.data.scoreboard);
          }
        }
      } catch (error) {
        toast.error("Error in updating data! Please try again later...");
      }
    }
  };

  const cancelEdit = (index) => {
    if (edit && id === index) {
      setEdit(false);
      setId(0);
      setEditedData(initialValues);
    }
  };

  const handleEdit = (row, index) => {
    setEdit(true);
    setId(index);
    const matchData = {
      match1: row.matchData.match1,
      match2: row.matchData.match2,
      match3: row.matchData.match3,
      match4: row.matchData.match4,
      match5: row.matchData.match5,
      match6: row.matchData.match6,
      match7: row.matchData.match7,
      match8: row.matchData.match8,
      match9: row.matchData.match9,
      match10: row.matchData.match10,
    };
    setEditedData(matchData);
  };

  const changeXI = async () => {
    try {
      const res = await instance.post(
        "/changexi",
        {},
        {
          headers: { Authorization: localStorage.getItem("auction") },
        }
      );
      if (res.status === 200) {
        toast.success("Playing-XI changed successfully");
        const getData = await instance.get("/scoreboard", {
          headers: { Authorization: localStorage.getItem("auction") },
        });
        if (getData.status === 200) {
          setFilteredPlayer(getData.data.scoreboard);
        }
      }
    } catch (error) {
      toast.error("Error in changing XI! Please try again later...");
    }
  };
  const changePrevXI = async () => {
    try {
      const res = await instance.post(
        "/changeprevxi",
        {},
        {
          headers: { Authorization: localStorage.getItem("auction") },
        }
      );
      if (res.status === 200) {
        toast.success("Playing-XI changed successfully");
        const getData = await instance.get("/scoreboard", {
          headers: { Authorization: localStorage.getItem("auction") },
        });
        if (getData.status === 200) {
          setFilteredPlayer(getData.data.scoreboard);
        }
      }
    } catch (error) {
      toast.error("Error in changing XI! Please try again later...");
    }
  };

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
            <div className="flex flex-wrap">
              <div className="bg-blue-600 rounded-md mr-2 my-1">
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
              <div className="my-1">
                <button
                  className="border-none outline-none bg-blue-600 text-white p-[8px] text-2xl rounded-md"
                  onClick={changeXI}
                >
                  Change XI
                </button>
              </div>
              <div className="my-1">
                <button
                  className="border-none outline-none bg-blue-600 text-white ml-2 p-[8px] text-2xl rounded-md"
                  onClick={changePrevXI}
                >
                  Prev XI
                </button>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default AdminScoreBoard;
