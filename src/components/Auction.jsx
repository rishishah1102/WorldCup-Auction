import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// css
import "../styles/auction.css";

// components
import AuctionUser from "./AuctionUser";
import AuctionDashboard from "./AuctionDashboard";

// utils
import instance from "../utils/axios";
import { toast } from "react-toastify";

function Auction() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    document.title = "Auction";
  }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await instance.get("/auction", {
          headers: { Authorization: localStorage.getItem("auction") },
        });
        if (res.status === 200) {
          setUsers(res.data.auction);
        }
      };
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center auctionPage">
      <div className="flex flex-row justify-between items-center bg-blue-600 w-[99%] m-auto h-16 rounded-md text-white">
        <h3 className="text-3xl mx-5">Welcome to Auction</h3>
        <button
          className="bg-yellow-400 mx-5 h-10 w-20 text-2xl rounded-md"
          onClick={() => navigate("/home")}
        >
          Leave
        </button>
      </div>
      <div className="flex justify-center items-center w-screen flex-wrap">
        {users?.map((user, index) => {
          if (
            index === 3 ||
            index === 4 ||
            index === 5 ||
            index === 6 ||
            index === 7 ||
            index === 8 ||
            index === 9
          ) {
            return null;
          } else {
            return <AuctionUser key={index} user={user} />;
          }
        })}
      </div>
      <div className="flex justify-center items-center w-screen flex-wrap">
        <div>
          {users?.map((user, index) => {
            if (
              index === 0 ||
              index === 1 ||
              index === 2 ||
              index === 4 ||
              index === 6 ||
              index === 7 ||
              index === 8 ||
              index === 9
            ) {
              return null;
            } else {
              return <AuctionUser key={index} user={user} />;
            }
          })}
        </div>

        <AuctionDashboard />

        <div>
          {users?.map((user, index) => {
            if (
              index === 0 ||
              index === 1 ||
              index === 2 ||
              index === 3 ||
              index === 5 ||
              index === 7 ||
              index === 8 ||
              index === 9
            ) {
              return null;
            } else {
              return <AuctionUser key={index} user={user} />;
            }
          })}
        </div>
      </div>
      <div className="flex justify-center items-center w-screen flex-wrap">
        {users?.map((user, index) => {
          if (
            index === 0 ||
            index === 1 ||
            index === 2 ||
            index === 3 ||
            index === 4 ||
            index === 5 ||
            index === 6
          ) {
            return null;
          } else {
            return <AuctionUser key={index} user={user} />;
          }
        })}
      </div>
    </div>
  );
}

export default Auction;
