import React from "react";
import { category, name, rating, status, notfound, runtime } from "../assets";
import { Link } from "react-router-dom";

const Card = ({ m_name, img, m_rating, m_status, m_genre, m_time, m_id }) => {
  return (
    <Link to={`card/${m_id}`}>
      <div className="flex justify-center items-center flex-col  rounded-xl shadow-xl mx-2 mb-2 px-2 py-3.5">
        <img
          src={img ? img : notfound}
          className="object-contain w-[300px]  rounded-lg"
          alt="Image Not found"
        />

        <div className=" flex w-full items-center mt-2 gap-2">
          <img src={name} alt="Not found" className="object-contain w-6" />
          <h4 className="text-lg font-satoshi font-semibold text-gray-700">
            {m_name}
          </h4>
        </div>
        <div className=" flex w-full items-center justify-between mt-2">
          {/* Rating Section */}
          <div className="flex gap-1 justify-center items-center ">
            <img src={rating} alt="Rating" className="object-contain w-9 " />
            <h4 className="text-lg font-satoshi font-semibold text-gray-700">
              {m_rating}
            </h4>
          </div>
          {/* Runtime Section */}
          <div className="flex gap-1 justify-center items-center ">
            <img src={runtime} alt="Rating" className="object-contain w-9 " />
            <h4 className="text-lg font-satoshi font-semibold text-gray-700">
              {`${m_time} min`}
            </h4>
          </div>

          {/* Status Section */}
          <div className="flex gap-1 justify-center items-center ">
            <img src={status} alt="Status" className="object-contain w-8 " />
            <h4 className="text-lg font-satoshi font-semibold text-gray-700">
              {m_status}
            </h4>
          </div>
        </div>

        <div className=" flex w-full items-center gap-1">
          <img src={category} alt="Category" className="object-contain w-8 " />
          <h4 className="text-lg font-satoshi font-semibold text-gray-700">
            {m_genre?.join(",")}
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default Card;
