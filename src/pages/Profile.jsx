import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// css
import "../styles/profile.css";

// Components
import Avatar from "@mui/material/Avatar";

// helper
import axios from "axios";
import instance from "../utils/axios";

// toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const navigate = useNavigate();

  if (!localStorage.getItem("auction")) {
    toast.error("Register yourself first!");
    navigate("/auth");
  }

  const [imageUrl, setImageUrl] = useState("");
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);

  // title
  useEffect(() => {
    document.title = "Profile";
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    console.log(process.env.REACT_APP_UPLOAD_PRESET);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

    setLoading(true); // Set loading to true while uploading

    try {
      let response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        formData
      );
      setImageUrl(response.data.url);
    } catch (error) {
      toast.error("Failed to upload the photo!");
      // console.error("Error uploading image:", error);
    } finally {
      setLoading(false); // Set loading to false when the upload is complete (success or error)
    }
  };

  const handleSubmit = async () => {
    console.log(teamName);
    console.log(imageUrl);
    if (teamName !== "" && imageUrl !== "") {
      try {
        let res = await instance.post(
          "/profile",
          {
            ImgUrl: imageUrl,
            teamname: teamName,
          },
          { headers: { Authorization: localStorage.getItem("auction") } }
        );
        if (res.status === 201) {
          toast.success(res.data.message);
          setImageUrl("");
          setTeamName("");
          navigate("/home");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please enter both fields!");
    }
  };

  return (
    <>
      <div className="profile h-[85.1%] w-full flex items-center justify-center">
        <div className={`wrapper`}>
          <div className="form-container sign-up">
            <div className="sdiv">
              <h2>Profile</h2>

              {/* Profile Picture */}
              <div className="form-group relative">
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  // Display the uploaded image when available
                  <Avatar
                    src={imageUrl}
                    style={{
                      height: "125px",
                      width: "125px",
                      margin: "0 auto",
                    }}
                    className="cursor-pointer"
                  />
                )}
                <input
                  name="profilePic"
                  type="file"
                  autoComplete="off"
                  className="profilePic absolute top-0 left-[9.8rem] cursor-pointer"
                  onChange={handleImageUpload}
                  required
                />
              </div>

              {/* Team Name */}
              <div className="form-group">
                <input
                  name="teamName"
                  type="text"
                  autoComplete="off"
                  required
                  placeholder="eg:- Abc Blasters"
                  className="placeholder:text-gray-900"
                  onChange={(e) => {
                    setTeamName(e.target.value);
                  }}
                />
                <label htmlFor="">
                  Team Name{" "}
                  <span className="text-red-600 text-md -ml-[3px]">*</span>
                </label>
                <i className="fas fa-at" />
              </div>

              {/* Button */}
              <button type="submit" className="btn" onClick={handleSubmit}>
                Set
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
