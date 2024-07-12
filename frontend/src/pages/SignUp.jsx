import React, { useState } from "react";
import { connect } from "react-redux";
import { signup } from "../actions/authActions";
import Sidebar from "../components/sidebar";
import { Switch } from "@headlessui/react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import classNames from "classnames";
import logo from "../assets/svg/2_20240611_041530_0001.svg";
import img from "../assets/images/8 1.svg";
import imgo from "../assets/images/CEEMAN IMG (2) 1.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import blueTick from "../assets/images/Blue tick.png";

const SignUp = () => {
  const initialFormData = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");

    // Store form values (this is where you'd typically send the data to a server)
    try {
      const response = await fetch(
        "https://ceeman-back.onrender.com/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSuccess("Signup successful");
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      setError("An error occurred");
    }

    console.log(formData);
    // setShowPopup(true);

    // Clear form
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="  w-full lg:h-screen md:h-screen h-full flex lg:flex-row md:flex-row flex-col">
        <Sidebar
          logo={logo}
          imageSrc={img}
          heading={`Let's Get Started`}
          sizeClass={`w-1/2    capitalize mx-auto  absolute bottom-0`}
        />
        <div className="w-full flex items-center justify-center h-full bg-white">
          <div className="bg-white px-10 py-8 rounded-lg w-full">
            <h2 className="text-2xl  font-bold mb-6">Create Account</h2>
            <form
              onSubmit={handleSubmit}
              className="placeholder:text-sm placeholder:font-bold"
            >
              <div className="mb-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 border placeholder:text-sm placeholder:font-bold border-gray-300 rounded mt-2"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border placeholder:text-sm placeholder:font-bold border-gray-300 rounded mt-2"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border placeholder:text-sm placeholder:font-bold border-gray-300 rounded mt-2"
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-[70%] transform -translate-y-1/2 cursor-pointer"
                />
              </div>
              <div className="mb-4 relative">
                {/* <label className="block text-gray-700">Confirm Password</label> */}
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full  p-2 border placeholder:text-sm placeholder:font-bold border-gray-300 rounded mt-2"
                  required
                />
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-2 top-[70%] transform -translate-y-1/2 cursor-pointer"
                />
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {/* TERMS AND CONDITIONS */}
              <Switch.Group
                as="div"
                className=" mt-[2rem] mx-auto flex gap-x-4 sm:col-span-2 mb-4"
              >
                <div className="flex h-6 items-center">
                  <Switch
                    checked={agreed}
                    onChange={setAgreed}
                    className={classNames(
                      agreed ? "bg-[#2544D8]" : "bg-gray-200",
                      "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    )}
                  >
                    <span className="sr-only">Agree to policies</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        agreed ? "translate-x-3.5" : "translate-x-0",
                        "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                </div>
                <Switch.Label className="md:text-sm text-xs leading-6 text-gray-600">
                  By selecting this, you agree to our{" "}
                  <Link to="/" className="font-semibold specialText">
                    privacy&nbsp;policy
                  </Link>
                  .
                </Switch.Label>
              </Switch.Group>
              <button
                type="submit"
                className="w-full bg-[#2544D8] shadow-custom transition-all duration-700 text-white p-2 rounded mt-4 hover:bg-blue-600"
              >
                Sign Up
              </button>
              <section className="mt-[3rem] flex w-[60%] justify-between items-center m-auto">
                <div className="w-[4rem] h-[3px] bg-[#D9D9D9]"></div>
                <h5 className="font-[900] text-sm text-center text-[#999]">
                  Or Sign Up With
                </h5>
                <div className="w-[4rem] h-[3px] bg-[#D9D9D9]"></div>{" "}
              </section>{" "}
              <div className="w-[40%] flex justify-center font-[4rem] mx-auto mt-[2rem]">
                {" "}
                <FaFacebookF
                  style={{
                    fontSize: "1.5rem",
                    marginRight: "20px",
                    color: "#2544D8",
                  }}
                />
                <FcGoogle style={{ fontSize: "1.5rem" }} />
              </div>
            </form>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {/* {success && <p style={{ color: "green" }}>{success}</p>} */}

          {success && (
            <div>
              <div className="  w-full lg:h-screen bg-white bg-opacity-50  md:h-screen h-full flex lg:flex-row md:flex-row flex-col">
                <Sidebar
                  logo={logo}
                  imageSrc={imgo}
                  heading={`Driven by Power,\nDefined by Reliability`}
                  sizeClass={`w-1/2 capitalize mx-auto  absolute bottom-0`}
                />
                <div className="w-full flex items-center  h-full bg-white">
                  <div className="bg-white text-[#2544D8] px-10 py-8 text-center rounded-lg w-full">
                    <img
                      src={blueTick}
                      alt="Blue_Tick_For_Validation"
                      className="m-auto"
                    />
                    <h2 className="text-base font-bold mb-4">
                      Congratulations!
                    </h2>
                    <p className="mb-4 ">
                      You have successfully signed up to Ceeman.
                    </p>
                    <Link to={"/signin"}>
                      <button
                        // onClick={() => setShowPopup(false)}
                        className="bg-[#2544D8] text-white w-full  py-2 px-9 rounded hover:bg-blue-600"
                      >
                        Get Started
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signup })(SignUp);

// export default SignUp;