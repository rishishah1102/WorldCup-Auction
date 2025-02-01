import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// icons
import CloseIcon from "@mui/icons-material/Close";

// toast
import { toast } from "react-toastify";

function JoinAuction({ closeJoin }) {
  const [auctionId, setAuctionId] = useState("");
  const navigate = useNavigate();

  const joinAuction = () => {
    if (auctionId !== "") {
      navigate("/auction", {
        state: {
          auctionId: auctionId,
        },
      });
      setAuctionId("");
    } else {
      toast.error("Please enter auction-ID!");
    }
  };

  return (
    <div className="w-full h-full bg-yellow-400 rounded-md">
      <span
        className="absolute right-3 top-3 text-white cursor-pointer"
        onClick={() => closeJoin(true)}
      >
        <CloseIcon style={{ fontSize: "22px" }} />
      </span>
      <div className="flex flex-col items-center relative top-10">
        <h3 className="text-white text-3xl my-4">Enter auction ID : </h3>
        <span className="relative w-[80%] bg-white h-16 rounded-lg">
          <input
            className="text-3xl py-4 pl-2 relative rounded-lg text-gray-600 border-none outline-none bg-transparent"
            type="text"
            onChange={(e) => setAuctionId(e.target.value)}
            value={auctionId}
            placeholder="eg:- ojIckSD2jqNzOqIrAGzL"
          />
          <button
            className="w-full bg-blue-600 h-16 rounded-lg my-4 text-3xl text-white"
            onClick={joinAuction}
          >
            Join
          </button>
        </span>
      </div>
    </div>
  );
}

export default JoinAuction;
