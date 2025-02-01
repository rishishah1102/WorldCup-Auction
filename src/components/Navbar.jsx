import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// css
import "../styles/navbar.css";

// assets
import logo from "../images/logo.jpeg";
import { Avatar, Drawer, List, ListItem, ListItemText } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

// utils
import instance from "../utils/axios";

// toast
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();

  const [imgUrl, setImgUrl] = useState("");
  const [username, setUserName] = useState("");
  const [logout, setLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await instance.get("/home", {
          headers: { Authorization: localStorage.getItem("auction") },
        });
        if (res.status === 200) {
          setUserName(res.data.foundUser.username);
          setImgUrl(res.data.foundUser.ImgUrl);
        }
      };
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, []);

  return (
    <div className="sticky z-10 top-0 bg-blue-600 shadow-md shadow-black h-28 box-border w-full">
      <nav className="flex items-center justify-between w-full h-full relative">
        {/* Logo */}
        <div className="flex items-center justify-center w-[10%] h-full">
          <img
            src={logo}
            className="h-20 w-44 ml-4 mix-blend-lighten cursor-pointer transition-all duration-300 ease-in-out hover:ml-6"
            alt="Logo"
          />
        </div>

        {/* routes */}
        <ul className="justify-center items-center list-none text-white w-[70%] h-full hidden lg:flex">
          <li className="text-3xl mx-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-600 w-24 text-center rounded-2xl">
            <NavLink to={"/home"}>Home</NavLink>
          </li>
          <li className="text-3xl mx-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-600 w-24 text-center rounded-2xl">
            <NavLink to={"/profile"}>Profile</NavLink>
          </li>
          <li className="text-3xl mx-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-600 w-28 text-center rounded-2xl">
            <NavLink to={"/players"}>Players</NavLink>
          </li>
          <li className="text-3xl mx-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-600 w-36 text-center rounded-2xl">
            <NavLink to={"/retention"}>Retention</NavLink>
          </li>
          <li className="text-3xl mx-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-600 w-28 text-center rounded-2xl">
            <NavLink to={"/squads"}>Squads</NavLink>
          </li>
          <li className="text-3xl mx-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-600 w-40 text-center rounded-2xl">
            <NavLink to={"/wt"}>Submission</NavLink>
          </li>
        </ul>

        {/* Profile */}
        <div
          className="items-center justify-center w-[20%] cursor-pointer h-full hidden lg:flex"
          onClick={() => setLogout(!logout)}
        >
          <Avatar
            src={imgUrl}
            className=""
            style={{ width: "45px", height: "45px" }}
          />
          <h3 className="text-white text-3xl text-center w-[96px] break-words">
            {username || "Rishabh Shah"}
          </h3>
          <span className="text-white">
            <ArrowDropDownIcon
              style={{ fontSize: "33px", marginLeft: "-12px" }}
            />
          </span>
        </div>

        {/* Logout Modal */}
        <div
          className={`${
            logout ? "visible h-20 opacity-100" : "invisible h-0 opacity-0"
          } absolute w-[140px] top-28 right-32 transition-all duration-300 ease-in-out cursor-pointer`}
        >
          <div
            className="bg-gray-200 h-full flex justify-center items-center hover:transition-all hover:duration-300 hover:ease-in-out"
            onClick={() => {
              localStorage.removeItem("auction");
              navigate("/auth");
            }}
          >
            <span className="hover:ml-1">
              <LogoutIcon
                style={{ fontSize: "25px" }}
                className="text-blue-600"
              />
            </span>
            <h3 className="text-3xl px-4 text-blue-600 hover:mr-1">Logout</h3>
          </div>
        </div>

        {/* Hamburger Menu Icon (visible in smaller screens) */}
        <div
          onClick={() => setMenuOpen(true)}
          className="block text-white mr-8 lg:hidden"
        >
          <MenuIcon style={{ color: "white", fontSize: "25px" }} />
        </div>
      </nav>

      {/* Responsive Drawer */}
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        className="lg:hidden"
        PaperProps={{ style: { width: 200 } }}
      >
        <List>
          <ListItem button component={NavLink} to="/home">
            <ListItemText primary="Home" className="text-center" />
          </ListItem>
          <ListItem button component={NavLink} to="/profile">
            <ListItemText primary="Profile" className="text-center" />
          </ListItem>
          <ListItem button component={NavLink} to="/players">
            <ListItemText primary="Players" className="text-center" />
          </ListItem>
          <ListItem button component={NavLink} to="/retention">
            <ListItemText primary="Retention" className="text-center" />
          </ListItem>
          <ListItem button component={NavLink} to="/squads">
            <ListItemText primary="Squads" className="text-center" />
          </ListItem>
          <ListItem button component={NavLink} to="/wt">
            <ListItemText primary="Submission" className="text-center" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              localStorage.removeItem("auction");
              navigate("/auth");
            }}
          >
            <ListItemText primary="Logout" className="text-center" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Navbar;
