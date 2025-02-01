import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import JoinAuction from "./JoinAuction";
import CreateAuction from "./CreateAuction";

// utils
import instance from "../utils/axios";
import { toast } from "react-toastify";

function AuctionCard({ type, list, title, name }) {
  const [create, setCreate] = useState(false);
  const [join, setJoin] = useState(false);
  const [auctioneer, setIsAuctioneer] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await instance.get("/home", {
          headers: { Authorization: localStorage.getItem("auction") },
        });
        if (res.status === 200) {
          setIsAuctioneer(res.data.foundUser.isAuctioneer);
        }
      };
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, []);

  const closeJoin = (close) => {
    if (close) {
      setJoin(false);
    }
  };

  const closeCreate = (close) => {
    if (close) {
      setCreate(false);
    }
  };

  return (
    <div className="bg-blue-600 flex justify-center items-center w-[320px] h-[465px] hover:-mt-4 rounded-xl transition-all duration-300 ease-in-out shadow-black shadow-lg relative my-5">
      <div className="h-full w-full flex flex-col items-center rounded-xl">
        {/* Button */}
        {/* Join Auction button */}
        {type === "Join" && (
          <button
            className={`bg-yellow-400 w-[80%] h-20 rounded-md m-10 text-3xl text-white transition-all duration-300 ease-in-out hover:bg-yellow-500 font-bold hover:italic ${
              auctioneer ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            onClick={() => setJoin(true)}
          >
            Join Auction
          </button>
        )}
        <div
          className={`${
            join && auctioneer
              ? "visible w-[300px] h-[200px] opacity-100"
              : "invisible w-0 h-0 opacity-0"
          } absolute bg-yellow-400 transition-all duration-500 ease-in-out rounded-md top-10`}
        >
          <JoinAuction closeJoin={closeJoin} />
        </div>

        {/* Create Auction button */}
        {type === "Create" && (
          <button
            className={`bg-yellow-400 w-[80%] h-20 rounded-md m-10 text-3xl text-white transition-all duration-300 ease-in-out hover:bg-yellow-500 font-bold hover:italic ${
              auctioneer ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            onClick={() => setCreate(true)}
          >
            Create Auction
          </button>
        )}
        <div
          className={`${
            create && auctioneer
              ? "visible w-[320px] h-[150px] opacity-100"
              : "invisible w-0 h-0 opacity-0"
          } absolute bg-yellow-400 transition-all duration-500 ease-in-out rounded-md top-10`}
        >
          <CreateAuction closeCreate={closeCreate} />
        </div>

        {/* Points Table */}
        {type === "Pt" && (
          <button
            className="bg-yellow-400 w-[80%] h-20 rounded-md m-10 text-3xl text-white transition-all duration-300 ease-in-out hover:bg-yellow-500 font-bold hover:italic"
            onClick={() => navigate("/pointsTable")}
          >
            Points Table
          </button>
        )}

        {/* Rules */}
        <div className="w-[80%]">
          <h3 className="text-4xl text-yellow-400">
            {title} <span className="text-red-600 text-2xl -ml-[2px]">***</span>
          </h3>
          <ul className="flex flex-col break-words">
            {list.map((li, index) => {
              return (
                <li className="text-2xl my-2 text-white" key={index}>
                  {li}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AuctionCard;
