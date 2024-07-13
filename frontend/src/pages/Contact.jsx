import React, { useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { FaFacebookF } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { SiWhatsapp } from "react-icons/si";
import { PiXLogo } from "react-icons/pi";
import Nav from "../components/Navbar";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    request: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://ceeman-back.onrender.com/api/contact_us",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Handle successful submission
        console.log("Your message has been sent successfully!");
        alert("Your message has been sent successfully!");
      } else {
        // Handle errors
        alert("There was an error sending your message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error sending your message. Please try again.");
    }
  };
  return (
    <>
      <div className="h-full font-gilroy overflow-y-scroll no-scrollbar">
        <Nav />
        <section className="relative  bg-white md:w-[100vw] w-full h-full py-20 md:h-[89vh] flex justify-center items-center">
          <div className="bg-[#2544D8] rounded-lg w-[90vw] md:w-[70vw] lg:w-[50vw] md:h-[70vh] h-full ">
            <section className="w-full h-full flex flex-col md:flex-row items-center">
              <section className="w-full md:w-[40%] h-full md:h-[80%] shadow-md bg-[#fff] -ml-4 md:ml-0 p-5 md:p-0">
                <div className="text-[#000] md:px-5 md:pt-5">
                  <h4 className="mb-5 text-sm font-[600]">Contact Us</h4>
                  <div className="flex flex-col py-5 text-xs font-medium gap-6 md:gap-10">
                    <div className="flex gap-3 items-start">
                      <FiPhoneCall className=" text-[#2544D8]" size={20} />
                      <a href="tel:+234803312345" className="text-black">
                        +234803312345
                      </a>
                    </div>
                    <div className="flex gap-3 items-start">
                      <MdMailOutline className=" text-[#2544D8]" size={20} />
                      <a href="mailto:info@ceeman.com" className="text-black">
                        info@ceeman.com
                      </a>
                    </div>
                    <div className="flex gap-3 items-start">
                      <GrLocation className=" text-[#2544D8]" size={25} />
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=B32%2FB33+Alaba+Int%E2%80%99l+Market+Ojo+Lagos%2C+Nigeria"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black"
                      >
                        B32/B33 Alaba Int’l Market Ojo Lagos, Nigeria
                      </a>
                    </div>
                    <div className="flex gap-3 items-start">
                      <GrLocation className=" text-[#2544D8]" size={35} />
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=No.+15+%26+16+Ebrahim+Mohd.+Sherif+Market%2C+Fikree+Mkt+Betten+Road+Deira+Dubai+(UAE)"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black"
                      >
                        No. 15 & 16 Ebrahim Mohd. Sherif Market, Fikree Mkt
                        Betten Road Deira Dubai (UAE)
                      </a>
                    </div>
                  </div>

                  <hr className="border-black border-t-2 w-1/2" />
                  <div className="flex w-full h-[4rem] items-center justify-evenly rounded-lg p-5 text-[#fff]">
                    <a href="https://www.facebook.com/profile.php?id=61561058851281&mibextid=ZbWKwL">
                      <FaFacebookF className="text-2xl" color="#2544D8" />
                    </a>
                    <a href="https://www.instagram.com/royalceeman?igsh=MWdrNDk1MjFyYnk0">
                      <GrInstagram className="text-2xl" color="#2544D8" />
                    </a>
                    <a href="https://wa.me/+2348150702005">
                      {" "}
                      <SiWhatsapp className="text-2xl" color="#2544D8" />
                    </a>{" "}
                  </div>
                </div>
              </section>
              <form
                onSubmit={handleSubmit}
                className="w-full md:w-[60%] flex flex-col items-center gap-4 md:gap-8 ml-auto p-4 md:p-10"
              >
                <h2 className="w-full text-[#fff] font-gilroy font-normal text-left text-xl">
                  What are we doing today?
                </h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full py-2 placeholder:text-[#1B191E] placeholder:font-normal placeholder:text-xs p-4 text-[#1B191E]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full py-2 placeholder:text-[#1B191E] placeholder:font-normal placeholder:text-xs p-4 text-[#1B191E]"
                />
                <textarea
                  name="request"
                  rows="5"
                  cols="33"
                  placeholder="Write your request here..."
                  value={formData.request}
                  onChange={handleChange}
                  className="w-full py-2 placeholder:text-[#1B191E] placeholder:font-normal placeholder:text-xs p-4 text-[#1B191E]"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-1 bg-[#fff] text-[#000] shadow-md font-bold"
                >
                  Send
                </button>
              </form>
            </section>
          </div>
        </section>
      </div>
    </>
  );
}

export default Contact;
