import React, { useState } from "react";
import gen from "../assets/images/6 3.svg";
import frame from "../assets/images/Frame 788.png";
import { Link } from "react-router-dom";
import hero from "../assets/images/Hero rectangle.svg";
function Hero() {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 300); // Reset animation state after the animation duration
  };

  return (
    <div
      className="w-full h-full font-poppins"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className=" py-20">
        <div className="flex md:flex-row flex-col justify-between">
          <div className="container mx-auto px-10">
            <h1 className="text-[#1B191E] max-w-[26rem] md:leading-[60px] leading-8 md:text-4xl text-xl font-semibold">
              Powering <br /> Your Future <br /> One Watt at a Time!
            </h1>
            <p className="md:text-base text-sm leading-7 font-normal">
              Reliable and Efficient Power Solutions for Every Need
            </p>

            <div className="flex md:flex-row flex-col gap-4 py-10">
              <Link
                to="/contact"
                className="text-white bg-[#1B191E] text-center text-sm w-full px-8 py-2"
              >
                <button
                  className={`${animate ? "animate-slideInLeft" : ""}`}
                  onClick={handleClick}
                >
                  Contact Us
                </button>
              </Link>{" "}
              <Link
                to="/signup"
                className="text-center border-[#1B191E] border w-full text-sm text-black  px-8 py-2"
              >
                {" "}
                <button
                  className={`${animate ? "animate-slideInLeft" : ""}`}
                  onClick={handleClick}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>

          <div>
            <img src={gen} alt="" className="md:w-[38rem] w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
