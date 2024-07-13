import React, { useEffect, useState } from "react";
import {
  viewCart,
  increaseCartItemQuantity,
  addToCart,
  decreaseCartItemQuantity,
  deleteCartItem,
} from "../actions/cartActions";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Breadcrumbs from "../BreadCrumb/BreadCrumbs";
import ClipLoader from "react-spinners/ClipLoader"; // Import loader component
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";

const Checkout = ({ item }) => {
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
  const [confirmItemId, setConfirmItemId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [hostedLink, setHostedLink] = useState("");
  const token = localStorage.getItem("auth");
  const [quantity, setQuantity] = useState(item?.quantity || 1);
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

  const handleIncreaseQuantity = (cartItemId, event) => {
    event.preventDefault(); // Prevent default form submission behavior

    setQuantity(quantity + 1);
    dispatch(increaseCartItemQuantity(cartItemId, 1))
      .then((updatedItem) => {
        setQuantity(updatedItem.quantity); // Sync with server response
        toast.success("Item quantity increased!");
      })
      .catch((error) => {
        setQuantity(quantity); // Revert to original quantity on error
        toast.error("Failed to increase item quantity");
        console.error("Increase quantity error:", error);
      });
  };

  const handleDecreaseQuantity = (cartItemId) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(decreaseCartItemQuantity(cartItemId, 1))
        .then((updatedItem) => {
          setQuantity(updatedItem.quantity); // Sync with server response
          toast.success("Item quantity decreased!");
        })
        .catch((error) => {
          setQuantity(quantity); // Revert to original quantity on error
          toast.error("Failed to decrease item quantity");
          console.error("Decrease quantity error:", error);
        });
    }
  };
  const handleDeleteCartItem = (cartItemId) => {
    // Show confirmation dialog before deleting
    setConfirmItemId(cartItemId);
  };

  const confirmDelete = (confirm) => {
    if (confirm) {
      dispatch(deleteCartItem(confirmItemId))
        .then(() => {
          toast.success("Item deleted successfully");
        })
        .catch((error) => {
          toast.error("Failed to delete item");
        });
    }
    // Clear confirmation state
    setConfirmItemId(null);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "https://ceeman-back.onrender.com/api/create-order",
        { cartItems },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Order created successfully:", response.data);
      if (response.data.status === "success" && response.data.data.link) {
        setHostedLink(response.data.data.link);
        setModalIsOpen(true);
      } else {
        toast.error("Failed to retrieve payment link");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order");
    }
  };

  return (
    <div className="font-gilroy">
      <Navbar />
      <Toaster />
      <div className="px-10">
        <Breadcrumbs />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#1B191E" loading={loading} size={35} />
        </div>
      ) : (
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
                    {/* Conditional rendering of image */}
                    <img
                      src={item.Products?.imageUrl[0]} // Ensure Products and imageUrl are correctly accessed
                      alt={item.Products?.name}
                      className="md:w-[195px] w-full md:h-[195px] h-full mx-auto"
                    />

                    <div className="flex flex-col md:items-start mt-10 items-center py-3 w-full">
                      <h3 className="text-xs font-normal">
                        {item.Products?.name}
                      </h3>

                      {item.unitPrice && (
                        <p className="md:text-base text-sm md:font-bold font-semibold">
                          <span>Price: </span>
                          {item.unitPrice}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-5 flex justify-between items-center">
                    <p
                      onClick={() => handleDeleteCartItem(item.CartItemID)}
                      className="inline-flex md:text-sm text-xs items-center gap-1 cursor-pointer"
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
                        <span>{quantity}</span>
                      </div>
                      <div
                        onClick={(event) =>
                          handleIncreaseQuantity(item.CartItemID, event)
                        }
                        className="bg-black text-white md:text-sm text-xs md:py-2 py-1 md:px-4 px-2 cursor-pointer"
                      >
                        <span>+</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-6 w-full h-full">
                  {item.Products?.name && (
                    <h1 className="text-sm font-normal">
                      {item.Products.name}
                    </h1>
                  )}
                  <hr className="border-[#ccc] my-2 w-full" />
                  <div className="flex flex-col justify-between gap-20 w-full h-full">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <p className="md:text-2xl text-base mt-3 font-bold">
                          {item.unitPrice}
                        </p>
                        <div className="bg-[#E5E9FA] inline-flex items-center gap-1 md:py-1 py-0.5 px-2 shadow-md">
                          <span className="bg-black text-white px-2 md:py-1 py-0.5 text-xs">
                            {quantity}
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
                    <button
                      onClick={handleCheckout}
                      className="mt-2 w-1/2 text-white bg-[#1B191E] py-2 font-400 text-xs"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
                <h2>{item.totalAmount}</h2>
              </div>
            ))}

            {/* Modal for payment link */}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              contentLabel="Payment Link Modal"
              ariaHideApp={false}
              className="flex justify-center h-screen items-center inset-0 bg-gray-500 bg-opacity-75"
            >
              <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Proceed to Payment</h2>
                <p className="mb-4">
                  Click the link below to complete your payment:
                </p>
                <div className="flex flex-col items-center gap-3">
                  <a
                    href={hostedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {hostedLink}
                  </a>
                  <button
                    onClick={() => setModalIsOpen(false)}
                    className="bg-black text-white py-2 px-4 mt-4"
                  >
                    Close
                  </button>
                </div>
              </div>
            </Modal>
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
                className="bg-black w-full text-white mt-3 py-1 px-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Confirmation Dialog */}
      {confirmItemId && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-lg text-center">
            <p>Are you sure you want to remove this item?</p>
            <div className="mt-4">
              <button
                onClick={() => confirmDelete(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mr-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => confirmDelete(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 ml-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Checkout;
