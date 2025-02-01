import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// css
import "../styles/auth.css";

// axios
import instance from "../utils/axios";

// toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// yup
import * as yup from "yup";
const regValidation = yup.object({
  username: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .required("Please enter your email")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]/,
      "Please Enter valid E-Mail"
    ),
});
const logValidation = yup.object({
  email: yup
    .string()
    .required("Please enter your email")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]/,
      "Please Enter valid E-Mail"
    ),
});

function Auth() {
  const navigate = useNavigate();

  // Check for "auction" item in localStorage when the component loads
  useEffect(() => {
    const auctionToken = localStorage.getItem("auction");

    if (auctionToken) {
      navigate("/home"); 
    }
  }, [navigate]);

  // toggle btn
  const [ractiveForm, setActiveForm] = useState(true);

  // to send otp
  const [otp, setOtp] = useState(new Array(6).fill(""));

  // show otp field
  const [rotp, setROTp] = useState(false);
  const [lotp, setLOTp] = useState(false);
  const [resOtp, setResOtp] = useState(0);

  // handleChange
  const [regValue, setRegValue] = useState({
    username: "",
    email: "",
  });
  const [logValue, setLogValue] = useState({
    email: "",
  });

  // title
  useEffect(() => {
    document.title = "Authentication";
  }, []);

  // toggle function
  const handleSignUpLinkClick = () => {
    // e.preventDefault();
    // console.log("handleSignUpLinkClick");
    setActiveForm(false);
  };
  const handleSignInLinkClick = () => {
    // e.preventDefault()
    // console.log("handleSignInLinkClick");
    setActiveForm(true);
  };

  // otp handling
  const handleOtpField1 = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [
      ...otp.map((d, idx) => (idx === index ? element.value : d)),
    ];
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const handleOtpField2 = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [
      ...otp.map((d, idx) => (idx === index ? element.value : d)),
    ];
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  // otp verification
  const verifyOtp = async (e) => {
    try {
      e.preventDefault();
      let enteredOTp = Number(otp.join(""));

      // verify otp
      if (resOtp === enteredOTp) {
        // check if it is register
        if (regValue.username !== "" && regValue.email !== "") {
          let res = await instance.post("/otp", {
            username: regValue.username,
            email: regValue.email,
          });
          if (res.status === 201) {
            setOtp(new Array(6).fill(""));
            toast.success("Otp Verified Successfully");
            setROTp(false);
            setResOtp(0);
            setRegValue({
              username: "",
              email: "",
            });
            localStorage.setItem("auction", res.data.token);
            navigate("/profile");
          }
        }

        //  check if it is login
        else {
          let res = await instance.post("/loginotp", {
            email: logValue.email,
          });
          if (res.status === 200) {
            setOtp(new Array(6).fill(""));
            toast.success("Otp Verified Successfully");
            setLOTp(false);
            setResOtp(0);
            setLogValue({
              email: "",
            });
            localStorage.setItem("auction", res.data.token);
            navigate("/home");
          }
        }
      } else {
        toast.error("Wrong Otp");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // register data handling
  const handleRChange = (e) => {
    const { name, value } = e.target;
    setRegValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // login data handling
  const handleLChange = (e) => {
    const { name, value } = e.target;
    setLogValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // register submission
  const handleRegValid = async () => {
    let valid;
    try {
      valid = await regValidation.validate(regValue, {
        abortEarly: false,
      });
    } catch (error) {
      toast.error("Enter Valid Credentials");
    }
    if (valid) {
      try {
        const response = await instance.post("/signup", valid);
        // const response = {
        //   status: 200,
        // };
        console.log(response);
        if (response.status === 201) {
          toast.success("OTP will be sent to your email!");
          setROTp(true);
          setResOtp(response.data.otp);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  // login submission
  const handleLogValid = async () => {
    let valid;
    try {
      valid = await logValidation.validate(logValue, {
        abortEarly: false,
      });
    } catch (error) {
      toast.error("Enter Valid Credentials");
    }

    try {
      const response = await instance.post("/signin", valid);
      // const response = {
      //   status: 200,
      // };

      if (response.status === 201) {
        toast.success("OTP will be sent to your email!");
        setLOTp(true);
        // console.log(response);
        setResOtp(response.data.otp);
      }
    } catch (error) {
      toast.error("Error in Login, Please try again later!");
    }
  };

  return (
    <div className="auth">
      <div
        className={`wrapper ${
          ractiveForm === true ? "animated-signup" : "animated-signin"
        }`}
      >
        <div className="form-container sign-up">
          <div className="sdiv">
            <h2>Register</h2>

            {!rotp ? (
              <>
                <div className="form-group">
                  <input
                    name="username"
                    type="text"
                    autoComplete="off"
                    onChange={handleRChange}
                    value={regValue.username}
                    required
                    placeholder="eg:- Abc Def"
                    className="placeholder:text-gray-900"
                  />
                  <label htmlFor="">username</label>
                  <i className="fas fa-at" />
                </div>
                <div className="form-group">
                  <input
                    name="email"
                    type="email"
                    autoComplete="off"
                    onChange={handleRChange}
                    value={regValue.email}
                    required
                    placeholder="eg:- abc@gmail.com"
                    className="placeholder:text-gray-900"
                  />
                  <label htmlFor="">email</label>
                  <i className="fas fa-at" />
                </div>
                <button type="submit" className="btn" onClick={handleRegValid}>
                  sign up
                </button>
              </>
            ) : (
              <>
                <div className="form-group">
                  <div className="otp">
                    {otp.map((data, index) => {
                      return (
                        <input
                          className="form-otp"
                          type="text"
                          name="otp"
                          maxLength="1"
                          key={index}
                          value={data}
                          onChange={(e) => handleOtpField1(e.target, index)}
                          onFocus={(e) => e.target.select()}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="forgot-pass">
                  <a href="/">Resend Otp</a>
                </div>
                <button type="submit" className="btn" onClick={verifyOtp}>
                  Verify
                </button>
              </>
            )}

            <div className="link">
              <p>
                You already have an account?
                <button className="signin-link" onClick={handleSignInLinkClick}>
                  sign in
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className="form-container sign-in">
          <div className="sdiv">
            <h2>login</h2>
            {!lotp ? (
              <>
                <div className="form-group">
                  <input
                    name="email"
                    type="email"
                    autoComplete="off"
                    onChange={handleLChange}
                    value={logValue.email}
                    required
                    placeholder="eg:- abc@gmail.com"
                    className="placeholder:text-gray-900"
                  />
                  <i className="fas fa-user" />
                  <label htmlFor="">email</label>
                </div>
                <button type="submit" className="btn" onClick={handleLogValid}>
                  login
                </button>
              </>
            ) : (
              <>
                <div className="form-group">
                  <div className="otp">
                    {otp.map((data, index) => {
                      return (
                        <input
                          className="form-otp"
                          type="text"
                          name="otp"
                          maxLength="1"
                          key={index}
                          value={data}
                          onChange={(e) => handleOtpField2(e.target, index)}
                          onFocus={(e) => e.target.select()}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="forgot-pass">
                  <a href="/">Resend Otp</a>
                </div>
                <button type="submit" className="btn" onClick={verifyOtp}>
                  Verify
                </button>
              </>
            )}
            <div className="link">
              <p>
                Don't have an account?
                <button className="signup-link" onClick={handleSignUpLinkClick}>
                  sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
