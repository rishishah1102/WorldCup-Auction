import React, { useEffect } from "react";

// components
import AuctionCard from "../components/AuctionCard";

const joinAuctionRules = [
  "1. There would be 100Cr purse for each player.",
  "2. Max of 4 players can be retained (16Cr, 12Cr, 8Cr, 6Cr) from your previous team.",
  "3. The squad should be min of 18 players.",
  "4. There should be min of 1 w/k, 2 batters & 3 bowlers in the squad.",
  "5. There should be max of 8 overseas players in squad.",
];

const createAuctionNote = [
  "1. The auctioneer can only start the auction.",
  "2. The auctioneer will create an auction-ID which should be distributed among players.",
  "3. The auctioneer can approve the retained players.",
  "4. The auctioneer can sell the players.",
  "5. The auctioneer controls the whole auction, incase of any disputes.",
];

const pointsTableNote = [
  "1. The points table will be activated after auction.",
  "2. The points table will be based on fantasy points of dream11.",
  "3. There would be leaderboard, table of players with fantasy points sorted in descending order & each player earned and benched points.",
  "4. You can watch each player points by clicking on their name.",
];

function Home() {
  // title
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className="flex justify-center items-center my-24 w-screen">
      {/* Cards */}
      <div className="flex w-screen justify-evenly items-center h-full flex-wrap">
        {/* Join auction */}
        <AuctionCard
          type={"Join"}
          name={"Join Auction"}
          list={joinAuctionRules}
          title={"Rules"}
        />

        {/* Start auction */}
        <AuctionCard
          type={"Create"}
          name={"Create Auction"}
          list={createAuctionNote}
          title={"Note"}
        />

        {/* Points Table */}
        <AuctionCard
          type={"Pt"}
          name={"Points Table"}
          list={pointsTableNote}
          title={"Note"}
        />
      </div>
    </div>
  );
}

export default Home;
