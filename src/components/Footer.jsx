import React from "react";

function Footer() {
  return (
    <div className="w-screen bg-blue-600 h-16">
      <footer className="page-footer font-small blue pt-4 flex justify-center items-center">
        <h5 className="text-2xl text-white">
          Copyrights &copy; 2023{" "}
          <a href="https://auction-ipl.vercel.app" className="text-white">www.auction-ipl.vercel.app</a>
        </h5>
      </footer>
    </div>
  );
}

export default Footer;
