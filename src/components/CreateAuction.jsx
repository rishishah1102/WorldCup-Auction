import React, { useEffect, useRef, useState } from "react";

// icons
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// randomID
import randomize from "randomatic";

// components
import FileUpload from "./FileUpload";

// utils
import parseExcel from "../utils/parseExcel";
import instance from "../utils/axios";

// toast
import { toast } from "react-toastify";

function CreateAuction({ closeCreate }) {
  const auctionIdRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);
  const [aucId, setAucId] = useState("");
  const [aucPlayers, setAucPlayers] = useState([]);

  useEffect(() => {
    setAucId(randomize("Aa0", 20));
  }, []);

  const copyToClipboard = async () => {
    try {
      // Select the input element
      auctionIdRef.current.select();
      // Copy the text to the clipboard
      await navigator.clipboard.writeText(auctionIdRef.current.value);
      // Set the copied state to true
      setIsCopied(true);

      // Reset the copied state after a short delay (e.g., 2 seconds)
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      const jsonData = await parseExcel(file);
      // console.log("JSON Data:", jsonData);
      setAucPlayers(jsonData);
    } catch (error) {
      console.error("Error parsing Excel file:", error);
    }
  };

  const addPlayerToDb = async () => {
    if (aucPlayers) {
      try {
        const res = await instance.post(
          "/addplayer",
          { aucPlayers },
          {
            headers: { Authorization: localStorage.getItem("auction") },
          }
        );
        if (res.status === 201) {
          toast.success("Player added to DB!");
        }
      } catch (error) {
        toast.error("Error in adding players to db");
      }
    } else {
      toast.error("Please add players");
    }
  };

  return (
    <div className="w-full h-full bg-yellow-400 rounded-tl-md rounded-tr-md">
      <span
        className="absolute right-3 top-3 text-white cursor-pointer"
        onClick={() => closeCreate(true)}
      >
        <CloseIcon style={{ fontSize: "22px" }} />
      </span>
      <div className="flex flex-col items-center relative top-10 bg-yellow-400 rounded-md pb-4">
        <h3 className="text-white text-3xl mt-4">Your auction ID is </h3>
        <span className="relative w-[80%] bg-white h-16 rounded-lg">
          <input
            ref={auctionIdRef}
            className="text-3xl py-4 pl-6 relative rounded-lg text-gray-600 border-none outline-none bg-transparent"
            value={aucId}
            readOnly
          />
          <span
            className="text-gray-600 absolute top-5 right-[3px] cursor-pointer"
            onClick={copyToClipboard}
          >
            {isCopied ? "Copied!" : <ContentCopyIcon />}
          </span>
        </span>
        <h1 className="text-white text-3xl mt-3 mb-5">Upload Excel file :-</h1>
        <FileUpload onFileUpload={handleFileUpload} />
        <button
          className="bg-blue-600 h-16 rounded-lg my-2 text-3xl text-white w-[80%]"
          onClick={addPlayerToDb}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default CreateAuction;
