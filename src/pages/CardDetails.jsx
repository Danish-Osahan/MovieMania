import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { category, name, rating, date, summary, notfound } from "../assets";
import axios from "axios";
import Popup from "reactjs-popup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardDetails = () => {
  const { id } = useParams();
  const [maindata, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/lookup/shows?thetvdb=${id}`
      );
      setData(response?.data);
      console.log(response?.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = () => {
    openPopup();
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [userdata, setUserData] = useState({
    u_name: "",
    u_password: "",
    seats: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(userdata));
    toast.success("Tickets Booked Successfully")
 
  };

  return (
    <>
    <ToastContainer/>
      <div className="max-w-3xl grid place-items-center grid-cols-1 md:grid-cols-2  px-2 py-4  mt-8 mb-4 shadow-2xl  rounded-xl">
        {/* Image Section */}
        <div className="">
          <img
            src={
              maindata?.image?.original ? maindata?.image?.original : notfound
            }
            alt="Not Found"
            className="object-contain w-full  rounded-md drop-shadow-xl"
          />
        </div>
        <div className="flex flex-col px-3 py-2">
          <div className="flex w-full flex-row justify-between">
            <div className=" flex w-full items-center    mt-2 gap-2">
              <img src={name} alt="Not found" className="object-contain w-6" />
              <h4 className="text-lg font-satoshi font-semibold text-gray-700">
                {maindata?.name}
              </h4>
            </div>
          </div>
          <div className=" flex w-full items-center    mt-2 gap-2">
            <img src={rating} alt="Not found" className="object-contain w-8" />
            <h4 className="text-lg font-satoshi font-semibold text-gray-700">
              {maindata?.rating?.average}
            </h4>
          </div>
          <div className="flex w-full flex-row justify-between">
            <div className=" flex w-full items-center mt-2 gap-2">
              <img
                src={category}
                alt="Not found"
                className="object-contain w-6"
              />
              <h4 className="text-lg font-satoshi font-semibold text-gray-700">
                {maindata?.genres?.join(",")}
              </h4>
            </div>
          </div>
          <div className=" flex w-full items-center mt-2 gap-2">
            <img src={date} alt="Not found" className="object-contain w-6" />
            <h4 className="text-lg font-satoshi font-semibold text-gray-700">
              {`Premiered ${maindata?.premiered}`}
            </h4>
          </div>
          <div className=" flex  items-center mt-2 gap-2">
            <div className=" flex flex-row  gap-1">
              <img
                src={summary}
                alt="Not Found"
                className="object-contain w-6"
              />
              <h4 className="text-lg font-satoshi font-extrabold text-gray-800">
                Summary :-
              </h4>
            </div>
          </div>
          <h4
            className="text-lg font-satoshi font-semibold text-gray-700"
            dangerouslySetInnerHTML={{ __html: maindata?.summary }}
          ></h4>
          {/* Ticket Booking Form */}
          <Popup
            trigger={
              <button
                onClick={handleClick}
                className=" rounded-lg px-2 py-3 translate-all bg-[#9C34C2] mt-2 border-none  font-satoshi font-semibold text-xl  hover:bg-[#FFA500] text-white hover:text-black"
              >
                Book Tickets
              </button>
            }
            modal
            nested
          >
            {(close) => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header font-satoshi font-extrabold text-3xl text-gray-900">
                  Book Tickets
                </div>
                {/* Form */}
                <div className="content">
                  <form
                    onSubmit={handleSubmit}
                    className="w-full flex justify-center items-center flex-col gap-2"
                  >
                    <div className="w-full flex text-center flex-row gap-1  rounded-lg space-x-4 px-2 justify-center items-center">
                      <label
                        htmlFor="m_name "
                        className="text-xl shadow-lg w-full rounded-md p-2 font-bold text-gray-900 "
                      >
                        MovieName{" "}
                      </label>
                      <input
                        type="text"
                        name="m_name"
                        readOnly
                        value={maindata?.name}
                        className="py-2 px-2 rounded-md text-gray-800 font-satoshi font-semibold ring-2 ring-purple-500 ring-offset-4 ring-offset-slate-50 outline-[2px] outline-offset-2 outline-purple-500 w-full"
                      />
                    </div>
                    <div className="w-full flex text-center flex-row gap-1  rounded-lg space-x-4 px-2 justify-center items-center">
                      <label
                        htmlFor="m_date "
                        className="text-xl shadow-lg w-full rounded-md p-2 font-bold text-gray-900 "
                      >
                        Date
                      </label>
                      <input
                        type="text"
                        name="m_date"
                        readOnly
                        value={maindata?.premiered}
                        className="py-2 px-2 rounded-md text-gray-800 font-satoshi font-semibold ring-2 ring-purple-500 ring-offset-4 ring-offset-slate-50 outline-[2px] outline-offset-2 outline-purple-500 w-full"
                      />
                    </div>
                    <div className="w-full flex text-center flex-row gap-1  rounded-lg space-x-4 px-2 justify-center items-center">
                      <label
                        htmlFor="user_name "
                        className="text-xl w-full shadow-lg rounded-md p-2 font-bold text-gray-900 "
                      >
                        UserName
                      </label>
                      <input
                        type="text"
                        name="user_name"
                        placeholder="Username"
                        className="py-2 px-2 rounded-md text-gray-800 font-satoshi font-semibold ring-2 ring-purple-500 ring-offset-4 ring-offset-slate-50 outline-[2px] outline-offset-2 outline-purple-500 w-full"
                        onChange={(e) => {
                          setUserData({ ...userdata, u_name: e.target.value });
                        }}
                        required={true}
                      />
                    </div>
                    <div className="w-full flex text-center flex-row gap-1  rounded-lg space-x-4 px-2 justify-center items-center">
                      <label
                        htmlFor="password"
                        className="text-xl w-full shadow-lg rounded-md p-2 font-bold text-gray-900 "
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        placeholder="password"
                        className="py-2 px-2 rounded-md text-gray-800 font-satoshi font-semibold ring-2 ring-purple-500 ring-offset-4 ring-offset-slate-50 outline-[2px] outline-offset-2 outline-purple-500 w-full"
                        onChange={(e) => {
                          setUserData({
                            ...userdata,
                            u_password: e.target.value,
                          });
                        }}
                        required={true}
                      />
                    </div>
                    <div className="w-full text-center flex flex-row gap-1  rounded-lg space-x-4 px-2 justify-center items-center">
                      <label
                        htmlFor="seats"
                        className="text-xl w-full shadow-lg rounded-md p-2 font-bold text-gray-900 "
                      >
                        Seats
                      </label>
                      <input
                        type="number"
                        name="seats"
                        placeholder="No. of Seats"
                        className="py-2 px-2 rounded-md text-gray-800 font-satoshi font-semibold ring-2 ring-purple-500 ring-offset-4 ring-offset-slate-50 outline-[2px] outline-offset-2 outline-purple-500 w-full"
                        onChange={(e) => {
                          setUserData({ ...userdata, seats: e.target.value });
                        }}
                        required={true}
                      />
                    </div>
                    <button
                      // onClick={close()}
                      type="submit"
                      className=" rounded-lg w-full px-2 py-2  translate-all bg-[#9C34C2] mt-2 border-none  font-satoshi font-semibold text-xl  hover:bg-[#FFA500] text-white hover:text-black"
                    >
                      Submit
                    </button>
                  </form>
                </div>
                {/* <div className="actions ">
                  <button
                  type="submit"
                   className=" rounded-lg w-full px-2 py-2  translate-all bg-[#9C34C2] mt-2 border-none  font-satoshi font-semibold text-xl  hover:bg-[#FFA500] text-white hover:text-black"
                  >
                    Submit
                  </button>
                </div> */}
              </div>
            )}
          </Popup>
        </div>
      </div>

      
    </>
  );
};

export default CardDetails;
