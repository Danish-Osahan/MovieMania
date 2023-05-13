import { React, useState, useEffect } from "react";
import { git, logo } from "../assets";
import axios from "axios";
import Card from "../components/Card";

const Main = () => {
  const [maindata, setMainData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Making request to api
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=all`
      );
      setMainData(response?.data);
      console.log(response?.data.slice(0, 1));
    } catch (error) {
      console.log(error);
    }
  };

  //   Setting the response whne the page loades
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <header className="w-full  flex justify-center items-center flex-col mb-2 mt-4">
        <nav className="w-full items-center justify-between flex ">
          <div className="justify-center items-center flex ">
            <img src={logo} alt="" className="w-20 object-contain" />
            <h3 className="font-satoshi sm:text-2xl xs:text-2xl md:text-3xl mt-1.5 lg:text-3xl font-extrabold purple_gradient ">
              MovieMania
            </h3>
          </div>

          <button className=" rounded-full translate-all bg-[#9C34C2]  border-none  font-satoshi font-semibold text-xl  hover:bg-[#FFA500] text-white hover:text-black">
            <img src={git} alt="Github" className="w-12 object-contain" />
          </button>
        </nav>
        <h2
          className="max-w-2x mt-6 text-center font-satoshi text-4xl
         font-extrabold "
        >
          Welcome to <span className="purple_gradient">MovieMania</span>
          <br />
          Explore your favorite movies and shows
        </h2>
      </header>

      <section
        className="flex 
      justify-center  items-center flex-wrap  flex-row "
      >
        {maindata?.map((data, i) => (
          <Card
            key={i}
            m_id={data?.show?.externals?.thetvdb}
            img={data?.show?.image?.medium}
            m_name={data?.show?.name}
            m_rating={data?.show?.rating?.average}
            m_status={data?.show?.status}
            m_genre={data?.show?.genres}
            m_time={data?.show?.runtime}
          />
        ))}
      </section>
    </>
  );
};

export default Main;
