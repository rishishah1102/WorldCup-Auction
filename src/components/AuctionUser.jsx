import React from "react";

// component
import Avatar from "@mui/material/Avatar";

function AuctionUser({ user }) {
  return (
    <div className="w-[24vw] h-[20vh] bg-blue-600 m-3 rounded-[40px] text-black">
      <h1 className="text-3xl pt-2 text-center text-white">{user?.teamname}</h1>
      <div className="flex w-[100%] justify-between items-center">
        <span>
          <Avatar
            src={user?.ImgUrl}
            className="ml-3"
            style={{
              height: "100px",
              width: "100px",
            }}
          />
        </span>
        <div className="flex flex-col">
          <div className="flex">
            <div className="bg-yellow-400 m-4 w-30 p-2 flex justify-center flex-col items-center rounded-md h-24">
              <h2 className="text-2xl">Bought Players</h2>
              <h1 className="text-5xl py-2">{user?.boughtPlayers}</h1>
            </div>
            <div className="bg-yellow-400 m-4 mr-8 w-30 p-2 flex justify-center flex-col items-center rounded-md h-24">
              <h2 className="text-2xl">OverSeas</h2>
              <h1 className="text-5xl py-2">{user?.overseas}</h1>
            </div>
          </div>
          <div className="bg-yellow-400 w-[218px] ml-2 text-center rounded-md text-[1.7rem]">
            Remaining Purse - {100 - user?.purseUsed} Cr
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionUser;
