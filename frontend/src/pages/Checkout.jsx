import React, { useEffect, useState } from "react";
import {
  viewCart,
  increaseCartItemQuantity,
  addToCart,
  decreaseCartItemQuantity,
  deleteCartItem,
} from "../actions/cartActions";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Checkout = () => {
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);
  const [showNotification, setShowNotification] = useState(false);
  const [phone_Number, setPhone_Number] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [address, setAddress] = useState("");
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          "https://ceeman-back.onrender.com/api/states"
        );
        setStates(response.data);
        setLoadingStates(false);
      } catch (error) {
        console.error("Error fetching states:", error);
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  const handleStateChange = async (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setSelectedCity(""); // Reset city selection

    if (stateName) {
      setLoadingCities(true);
      try {
        const response = await axios.get(
          `https://ceeman-back.onrender.com/api/states/${stateName}/cities`
        );
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoadingCities(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const locationData = {
      state: selectedState,
      city: selectedCity,
      address,
      phone_Number,
    };

    try {
      const response = await axios.post(
        "https://ceeman-back.onrender.com/api/location/save",
        locationData
      );
      console.log("Location saved successfully:", response.data);
      // Optionally reset the form here
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };

  useEffect(() => {
    dispatch(viewCart());
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId));
  };

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  const handleIncreaseQuantity = (cartItemId) => {
    dispatch(increaseCartItemQuantity(cartItemId, 1));
    toast.success("Item quantity increased!");
  };

  const handleDecreaseQuantity = (cartItemId) => {
    dispatch(decreaseCartItemQuantity(cartItemId, 1));
    toast.success("Item quantity decreased!");
  };

  const handleDeleteCartItem = (cartItemId) => {
    dispatch(deleteCartItem(cartItemId))
      .then(() => {
        toast.success("Item deleted successfully");
      })
      .catch((error) => {
        toast.error("Failed to delete item");
      });
  };
  return (
    <div className="font-gilroy">
      <Navbar />
      {showNotification && (
        <Notification
          message="Product has been added to cart"
          type="success"
          onClose={() => setShowNotification(false)}
        />
      )}
      <Toaster />
      <div className="grid grid-cols-12 px-[2rem] py-20 gap-4">
        {/* Cart Items */}
        <div className="col-span-12 border bg-[#E5E9FA] h-full xl:col-span-8">
          {cartItems.length === 0 && <p>No items in the cart.</p>}
          {cartItems.map((item) => (
            <div
              key={item.CartItemID}
              className="flex md:flex-row flex-col items-start border-b py-4"
            >
              <div className="px-6 flex flex-col py-6 w-full">
                <div className="bg-white w-full flex flex-col md:px-10 px-4 shadow-md py-2">
                  <img
                    src={item.Products.imageUrl[0]}
                    alt={item.name}
                    className="md:w-[195px] w-full md:h-[195px] h-full mx-auto"
                  />
                  <div className="flex flex-col md:items-start mt-10 items-center py-3 w-full">
                    <h3 className="text-xs font-normal">
                      {item.Products.name}
                    </h3>
                    <p className="md:text-base text-sm md:font-bold font-semibold">
                      <span>Price: </span>
                      {item.unitPrice}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex justify-between items-center">
                  <p
                    onClick={() => handleDeleteCartItem(item.CartItemID)}
                    className="inline-flex md:text-sm text-xs items-center gap-1"
                  >
                    <RiDeleteBin6Line />
                    Remove Item
                  </p>
                  <div className="flex gap-3 items-center">
                    <div
                      onClick={() => handleDecreaseQuantity(item.CartItemID)}
                      className="bg-black text-white md:text-sm text-xs md:py-2 py-1 md:px-4 px-2 cursor-pointer"
                    >
                      <span>-</span>
                    </div>
                    <div className="bg-white shadow-md text-black md:text-sm text-xs md:py-2 py-1 md:px-4 px-2">
                      <span>{item.quantity}</span>
                    </div>
                    <div
                      onClick={() => handleIncreaseQuantity(item.CartItemID)}
                      className="bg-black text-white md:text-sm text-xs md:py-2 py-1 md:px-4 px-2 cursor-pointer"
                    >
                      <span>+</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-6 w-full h-full">
                <h1 className="text-sm font-normal">{item.Products.name}</h1>
                <hr className="border-[#ccc] my-2 w-full" />
                <div className="flex flex-col justify-between gap-20 w-full h-full">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <p className="md:text-2xl text-base mt-3 font-bold">
                        {item.unitPrice}
                      </p>
                      <div className="bg-[#E5E9FA] inline-flex items-center gap-1 md:py-1 py-0.5 px-2 shadow-md">
                        <span className="bg-black text-white px-2 md:py-1 py-0.5 text-xs">
                          {item.quantity}
                        </span>
                        <span className="text-black md:text-xs text-[8px]">
                          ITEMS IN CART
                        </span>
                      </div>
                    </div>
                    <div className="flex md:flex-row flex-row gap-3 md:items-center items-start max-w-md">
                      <button className="mt-2 md:w-1/4 w-1/2 text-[#248C1B] bg-[#fff] py-1 font-400 text-xs">
                        In Stock
                      </button>
                      <button
                        onClick={handleAddToCart}
                        className="mt-2 md:w-1/4 w-1/2 text-[#C0213D] text-opacity-[30%] bg-[#fff] py-1 font-400 text-xs shadow-md"
                      >
                        Out Of Stock
                      </button>
                    </div>
                  </div>
                  <button className="mt-2 w-1/2 text-white bg-[#1B191E] py-2 font-400 text-xs">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery and Pickup Column */}
        <div className=" col-span-12 border bg-[#E5E9FA] w-full h-[500px] xl:col-span-4 px-10 py-6 sticky top-20">
          <h1 className="font-bold text-base">Delivery and Pickup</h1>
          <hr className="border-[#ccc] my-2 w-full" />
          <h1>Select Your Location</h1>
          <form onSubmit={handleSubmit} className="space-y-4 py-6">
            <div>
              <select
                id="state"
                value={selectedState}
                onChange={handleStateChange}
                className="border-black border w-full border-opacity-[50%] bg-transparent rounded p-2"
                required
              >
                <option value="">Select a state</option>
                {loadingStates ? (
                  <option disabled>Loading states...</option>
                ) : (
                  states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <select
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="border-black border w-full mt-3 border-opacity-[50%] bg-transparent rounded p-2"
                disabled={!selectedState}
                required
              >
                <option value="">Select a city</option>
                {loadingCities ? (
                  <option disabled>Loading cities...</option>
                ) : (
                  cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border-black border mt-3 w-full border-opacity-[50%] bg-transparent rounded p-2"
                placeholder="Enter your address"
                required
              />
            </div>
            <div>
              <input
                type="tel"
                id="phone"
                value={phone_Number}
                onChange={(e) => setPhone_Number(e.target.value)}
                className="border-black border w-full mt-3 border-opacity-[50%] bg-transparent rounded p-2"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-black w-full text-white mt-3 py-1 px-4 "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
