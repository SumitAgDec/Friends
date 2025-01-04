import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/all");
        setData(res.data.friends);
        console.log("Fetched data:", res.data.friends);
      } catch (err) {
        console.error("Error fetching data:", err);
        navigate("/login");
      }
    };
    fetchData();
  }, []);

  return <div>{data.map((friend) => friend.name)} </div>;
}

export default Home;
